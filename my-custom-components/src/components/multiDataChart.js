(() => ({
  name: 'Multi Data Chart',
  type: 'BODY_COMPONENT',
  icon: 'TitleIcon',
  orientation: 'HORIZONTAL',
  allowedTypes: [],
  jsx: (() => {
    const {
      Chart,
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip,
      SubTitle
    } = window.ChartJS;

    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip,
      SubTitle
    );

    // Register all charts elements to enable functionality
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const {
      color,
      backgroundType,
      backgroundColorValue,
      backgroundImageValue,
      chartDataProperty,
      chartDataPropertyTwo,
      chartDataPropertyThree,
      chartLabelProperty,
      chartDataType,
      chartTypeOne,
      chartTypeTwo,
      chartTypeThree,
      model,
      orderBy,
      order,
      filter,
      showLegend,
      legendOne,
      legendTwo,
      legendThree,
      legendPosition,
      legendTextDirection,
      legendTitle,
      legendAlignment,
      showLegendTitle,
      showTooltip,
      legendTitleFontSize,
      showError,
      staticData,
      staticDataTwo,
      staticDataLabels,
      toggleCanvasBackgroundColor,
      tooltipXAlignment,
      tooltipYAlignment,
      yBeginAtZero,

      // Styling Chart 1
      chartOneStyle,
      colorOne,
      lightenInnerOne,
      borderWidthOne,
      borderRadiusOne,
      fillOne,
      tensionOne,
      thicknessOne,

      // Styling Chart 2
      chartTwoStyle,
      colorTwo,
      lightenInnerTwo,
      borderWidthTwo,
      borderRadiusTwo,
      fillTwo,
      tensionTwo,
      thicknessTwo,

      // Styling Chart 2
      chartThreeStyle,
      colorThree,
      lightenInnerThree,
      borderWidthThree,
      borderRadiusThree,
      fillThree,
      tensionThree,
      thicknessThree,

      // Styling Axes
      xAxesAdornment,
      xAxesAdornmentPos,

      yAxesConfig,
      yAxesAdornment,
      yAxesAdornmentPos,

    } = options;

    const {
      useAllQuery,
      getProperty,
      useFilter,
      useText,
      env,
    } = B;

    const isDev = env === 'dev';
    const staticDataArray = staticData.split('\n');
    const staticDataArrayTwo = staticDataTwo.split('\n');
    const chartLabelValue = staticDataLabels.split('\n');
    const displayError = showError === 'built-in';
    const chartRef = React.createRef();
    const chartDataPropertyVal = chartDataProperty ? getProperty(chartDataProperty) : null;
    const chartDataPropertyValTwo = chartDataPropertyTwo ? getProperty(chartDataPropertyTwo) : null;
    const chartDataPropertyValThree = chartDataPropertyThree ? getProperty(chartDataPropertyThree) : null;
    const chartLabelPropertyVal = getProperty(chartLabelProperty);
    const tooltipEnabled = showTooltip !== 'disabled' ? true : false;
    const chartLabelOne = useText(legendOne);
    const chartLabelTwo = useText(legendTwo);
    const chartLabelThree = useText(legendThree);
    const where = useFilter(filter);

    let dataError = false;
    let dataErrorMsg = [''];

    let backgroundColorPlugin;
    let backgroundImagePlugin;

    const backgroundColor = backgroundColorValue === '' ? 'rgba(255, 255, 255, 0)' : backgroundColorValue

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (min - max) + min);
    }

    if (backgroundType === 'color') {
      backgroundColorPlugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      }
    } else {
      const image = new Image();
      image.src = backgroundImageValue

      backgroundImagePlugin = {
        id: 'custom_canvas_background_image',
        beforeDraw: (chart) => {
          if (image.complete) {
            const ctx = chart.ctx;
            const { top, left, width, height } = chart.chartArea;
            const x = left + width / 2 - image.width / 2;
            const y = top + height / 2 - image.height / 2;
            ctx.drawImage(image, x, y);
          } else {
            image.onload = () => chart.draw();
          }
        }
      }
    }

    const backgroundPlugin = backgroundType === 'color' ? backgroundColorPlugin : backgroundImagePlugin;

    const chartData = {
      id: [],
      data: [],
      labels: [],
    }
    const chartDataTwo = {
      id: [],
      data: [],
    }

    const chartDataThree = {
      id: [],
      data: [],
    }

    // LOGIC to fill dataChart[] 1 & 2
    let chartDataLabels = [];

    // Check what kind of data is used
    if (chartDataType === 'dynamic') {
      // Make sure to only fetch data when NOT in dev mode.
      if (!isDev && model) {
        const { loading, error, data, refetch } =
          model && useAllQuery(model, {
            rawFilter: where,
            skip: 0,
            take: 20,
            variables: {
              ...(orderBy ? { sort: { relation: order } } : {}),
            },
            onCompleted(res) {
              const hasResult = res && res.result && res.result.length > 0;
              if (hasResult) {
                B.triggerEvent('onCompleted', res);
              } else {
                B.triggerEvent('onNoResult');
              }
            },
            onError(resp) {
              if (!displayError) {
                B.triggerEvent('onError', resp);
              }
            },
          });

        // Check if a result is present, then map this to chartData[] 1
        if (!loading && data) {
          data.results.forEach((item) => {
            // Data set IDS
            chartData.id.push(item.id);
            // Data points
            if (chartDataPropertyVal !== null) {
              chartData.data.push(item[chartDataPropertyVal.name]);
            }
            if (chartDataPropertyValTwo !== null) {
              chartDataTwo.data.push(item[chartDataPropertyValTwo.name]);
              chartDataTwo.id.push(item.id);
            }
            if (chartDataPropertyValThree != null) {
              chartDataThree.data.push(item[chartDataPropertyValThree.name])
              chartDataThree.id.push(item.id);
            }

            // Data labels
            chartData.labels.push(item[chartLabelPropertyVal.name]);
          });
          chartDataLabels = chartData.labels;
        } else if (error) {
          // TODO: CREATE ERRROR HANDLING
          dataError = true;
          dataErrorMsg.push(error);
        };
      } else {
        // If we're in DEV mode, than give the user an indication that data cannot be previewed here.
        chartData.data = [0];
        chartData.labels = ['', 'Dynamic data can not be previewed in page builder', ''];
      }
    } else {
      for (let i = 1; i <= staticDataArray.length; i++) {
        chartData.id.push(i);
        chartDataTwo.id.push(i);
      }

      chartData.data = staticDataArray;
      chartDataLabels = chartLabelValue;
      chartDataTwo.data = staticDataArrayTwo;
    }


    // Function to handle windowsize change
    const handleWindowSizeChange = () => {
      setWindowWidth(window.innerWidth);
    }

    let colorOneValue = colorOne;
    let colorTwoValue = colorTwo;
    let colorThreeValue = colorThree;

    if (lightenInnerOne) {
      colorOneValue = colorOne.replace(')', ', 0.1)');
    }
    if (lightenInnerTwo) {
      colorTwoValue = colorTwo.replace(')', ', 0.1)');
    }
    if (lightenInnerThree) {
      colorThreeValue = colorThree.replace(')', ', 0.1)');
    }


    // TODO: Map clickhandler to points in the chart.
    function handleOnPointClick(e, chart) {
      const points = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
      if (points.length) {
        const firstPoint = points[0];
        const index = firstPoint.index;
        const id = chartData.id[index];

        B.triggerEvent('onPointClick', id);
      }
    }


    const devChartId = 'devChart_' + getRandomInt(100, 20000);

    const dataSets = [];


    // Dataset 1
    if (chartDataProperty) {
      dataSets.push(
        {
          backgroundColor: [
            colorOneValue,
          ],
          borderColor: [
            colorOne, // Border always has primary color value
          ],
          borderRadius: borderRadiusOne,
          borderWidth: borderWidthOne,
          barPercentage: thicknessOne,
          data: chartData.data,
          fill: fillOne,
          label: chartLabelOne,
          tension: chartTypeOne === 'line' ? tensionOne : 0,
          type: chartTypeOne,
        },
      );
    }
    // Dataset 2
    if (chartDataPropertyTwo) {
      dataSets.push(
        {
          backgroundColor: [
            colorTwoValue,
          ],
          barPercentage: thicknessTwo,
          borderColor: [
            colorTwo,
          ],
          borderRadius: borderRadiusTwo,
          borderWidth: borderWidthTwo,
          data: chartDataTwo.data,
          fill: fillTwo,
          label: chartLabelTwo,
          tension: chartTypeTwo === 'line' ? tensionTwo : 0,
          type: chartTypeTwo,
        }
      )
    }
    // Dataset 3
    if (chartDataPropertyThree) {
      dataSets.push(
        {
          backgroundColor: [
            colorThreeValue,
          ],
          barPercentage: thicknessThree,
          borderColor: [
            colorThree,
          ],
          borderRadius: borderRadiusThree,
          borderWidth: borderWidthThree,
          data: chartDataThree.data,
          fill: fillThree,
          label: chartLabelThree,
          tension: chartTypeThree === 'line' ? tensionThree : 0,
          type: chartTypeThree,
        }
      )
    }


    if (isDev) {
      useEffect(() => {
        // OnMount component:

        // Event listener to make sure that the chart UI gets updated when the window size changes.
        // This leads to the window resizing nicely
        window.addEventListener('resize', handleWindowSizeChange);
        const ctx = document.getElementById(devChartId);

        const devChart = new Chart(ctx, {
          // Chart options
          data: {
            labels: [...chartDataLabels],
            datasets: dataSets
          },
          plugins: [backgroundPlugin],
          options: {
            plugins: {
              legend: {
                display: showLegend,
                position: legendPosition,
                align: legendAlignment,
                textDirection: legendTextDirection,
                title: {
                  display: showLegendTitle,
                  text: legendTitle,
                },
              },

              tooltip: {
                enabled: tooltipEnabled,
                xAlign: tooltipXAlignment,
                yAlign: tooltipYAlignment,

              },
            },
            scales: {
              x: {
                type: 'category',
                labels: [...chartDataLabels],
                ticks: {
                  callback: function (value, index, ticks) {
                    if (xAxesAdornmentPos === 'start') return xAxesAdornment + ' ' + chartDataLabels[index];
                    else return chartDataLabels[index] + ' ' + xAxesAdornment;
                  },
                },
              },
              y: {
                beginAtZero: yBeginAtZero,
                ticks: {
                  callback: function (value, index, ticks) {
                    if (yAxesAdornmentPos === 'start') return yAxesAdornment + ' ' + value;
                    else return value + ' ' + yAxesAdornment
                  },
                },
                type: yAxesConfig,
              }
            }
          }
        })
        return () => {
          // Unmount component
          devChart.destroy();
          window.removeEventListener('resize', handleWindowSizeChange)
        }
      }, [
        // Values to watch for
        chartRef,
        windowWidth,
        borderWidthOne,
        borderWidthTwo,
        borderWidthThree,
        borderRadiusOne,
        borderRadiusTwo,
        borderRadiusThree,
        colorOne,
        colorTwo,
        colorThree,
        color,
        chartData,
        chartLabelOne,
        chartLabelTwo,
        chartLabelThree,
        lightenInnerOne,
        lightenInnerTwo,
        lightenInnerThree,
        showLegend,
        showLegendTitle,
        legendAlignment,
        legendPosition,
        legendTextDirection,
        legendTitle,
        legendTitleFontSize,
        tooltipEnabled,
        tooltipXAlignment,
        tooltipYAlignment,
        staticDataArray,
        toggleCanvasBackgroundColor,
        yBeginAtZero
      ])
    } else {
      useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        const ctx = chartRef.current;

        const myChart = new Chart(ctx, {
          // Chart options
          data: {
            labels: [...chartDataLabels],
            datasets: dataSets
          },
          plugins: [backgroundPlugin],
          options: {
            plugins: {
              legend: {
                display: showLegend,
                position: legendPosition,
                align: legendAlignment,
                textDirection: legendTextDirection,
                title: {
                  display: showLegendTitle,
                  text: legendTitle,
                },
              },

              tooltip: {
                enabled: tooltipEnabled,
                xAlign: tooltipXAlignment,
                yAlign: tooltipYAlignment,

              },
            },
            scales: {
              x: {
                type: 'category',
                labels: [...chartDataLabels],
                ticks: {
                  callback: function (value, index, ticks) {
                    if (xAxesAdornmentPos === 'start') return xAxesAdornment + ' ' + chartDataLabels[index];
                    else return chartDataLabels[index] + ' ' + xAxesAdornment;
                  },
                },
              },
              y: {
                beginAtZero: yBeginAtZero,
                ticks: {
                  callback: function (value, index, ticks) {
                    const format = value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                    if (yAxesAdornmentPos === 'start') return yAxesAdornment + ' ' + format;
                    else return format + ' ' + yAxesAdornment
                  },
                },
                type: yAxesConfig,
              }
            }
          }
        });

        return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
          myChart.destroy();
        }
      }, [
        chartData,
        chartDataTwo,
        chartDataThree,
      ])
    }
    return isDev ? (
      <canvas id={devChartId} className={classes.root}></canvas>
    ) : (
      dataError ? <div>Oops! an error has ocurred when fetching your data. More info: {dataErrorMsg} </div> :
        <canvas ref={chartRef} className={classes.root}></canvas>
    );

  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    return {
      root: {
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
        margin: 0,
        paddingTop: ({ options: { padding } }) =>
          style.getSpacing(padding[0], 'Desktop'),
        paddingRight: ({ options: { padding } }) =>
          style.getSpacing(padding[1], 'Desktop'),
        paddingBottom: ({ options: { padding } }) =>
          style.getSpacing(padding[2], 'Desktop'),
        paddingLeft: ({ options: { padding } }) =>
          style.getSpacing(padding[3], 'Desktop'),
        letterSpacing: ({ options: { type } }) => style.getLetterSpacing(type),
        textAlign: ({ options: { align } }) => align,
        fontSize: 'Body1',
      },
    };
  },
}))();
