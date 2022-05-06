(() => ({
  name: 'Multi Model Chart',
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
      chartLabelProperty,
      chartLabelPropertyTwo,
      chartDataType,
      chartTypeOne,
      chartTypeTwo,
      currentRecord,
      model,
      modelTwo,
      orderBy,
      orderByTwo,
      order,
      filter,
      filterTwo,
      showLegend,
      legendOne,
      legendTwo,
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
    const chartDataPropertyVal = getProperty(chartDataProperty);
    const chartDataPropertyValTwo = getProperty(chartDataPropertyTwo);
    const chartLabelPropertyVal = getProperty(chartLabelProperty);
    const chartLabelPropertyValTwo = getProperty(chartLabelPropertyTwo);
    const tooltipEnabled = showTooltip !== 'disabled' ? true : false;
    const [interactionFilter, setInteractionFilter] = useState({});
    const chartLabelOne = useText(legendOne);
    const chartLabelTwo = useText(legendTwo);

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


    function getFilter(filter) {
      console.log(2, filter)

      const deepMerge = (...objects) => {
        const isObject = (item) =>
          item && typeof item === 'object' && !Array.isArray(item);

        return objects.reduce((accumulator, object) => {
          Object.keys(object).forEach((key) => {
            const accumulatorValue = accumulator[key];
            const value = object[key];

            if (Array.isArray(accumulatorValue) && Array.isArray(value)) {
              accumulator[key] = accumulatorValue.concat(value);
            } else if (isObject(accumulatorValue) && isObject(value)) {
              accumulator[key] = deepMerge(accumulatorValue, value);
            } else {
              accumulator[key] = value;
            }
          });
          return accumulator;
        }, {});
      };

      const getFilter = React.useCallback(() => {
        if (isDev || !currentRecord || !model) {
          return filter;
        }
        const idProperty = getIdProperty(model);
        return {
          ...filter,
          [idProperty.id]: { eq: currentRecord },
        };
      }, [isDev, filter, currentRecord, model]);

      const selectedFilter = getFilter();
      let interactionFilters = {};

      const isEmptyValue = (value) =>
        !value || (Array.isArray(value) && value.length === 0);

      const clauses = Object.entries(interactionFilter)
        .filter(([, { value }]) => !isEmptyValue(value))
        .map(([, { property, value }]) =>
          property.id.reduceRight((acc, field, index, arr) => {
            const isLast = index === arr.length - 1;
            if (isLast) {
              return Array.isArray(value)
                ? {
                  _or: value.map((el) => ({
                    [field]: { [property.operator]: el },
                  })),
                }
                : { [field]: { [property.operator]: value } };
            }
            return { [field]: acc };
          }, {}),
        );

      interactionFilters =
        clauses.length > 1 ? { _and: clauses } : clauses[0] || {};

      const completeFilter = deepMerge(selectedFilter, interactionFilters);

      return useFilter(completeFilter);

    }

    const chartData = {
      id: [],
      data: [],
      labels: [],
    }
    const chartDataTwo = {
      id: [],
      data: [],
      labels: [],
    }

    const _and = [{
      revision: { eq: 380 },
    }]

    let requestOneCompleted = false;
    let requestTwoCompleted = false;
    let hasResultOne = false;
    let hasResultTwo = false;

    function fetchData(modelId, orderBy, where, request) {
      console.log(3, where);
      const { loading, error, data, refetch } =
        modelId && useAllQuery(modelId, {
          rawFilter: where,
          skip: 0,
          take: 20,
          variables: {
            ...(orderBy ? { sort: { relation: order } } : {}),
          },
          onCompleted(res) {
            const hasResult = res && res.result && res.result.length > 0;
            if(request === 1) {
              requestOneCompleted = true;
              if(hasResult) {
                hasResultOne = true;
              } 
            } else {
              requestTwoCompleted = true;
              if(hasResult) {
                hasResultTwo = true;
              }
            }
          },
          onError(resp) {
            if (!displayError) {
              B.triggerEvent('onError', resp);
            }
          },
        })
      const tmp = {
        loading,
        error,
        data,
        refetch,
      }
      return tmp;
    }

    

    // LOGIC to fill dataChart[] 1 & 2
    let chartDataLabels = [];

    // Check what kind of data is used
    if (chartDataType === 'dynamic') {

      // Make sure to only fetch data when NOT in dev mode.
      if (!isDev && model && modelTwo) {

        // Create filter objectsvbc 5
        const where = getFilter(filter);
        const whereTwo = getFilter(filterTwo);

        console.log(1, where, whereTwo);

        //Fetch 1st & 2nd model
        const modelOneRes = fetchData(model, orderBy, where);
        const modelTwoRes = fetchData(modelTwo, orderByTwo, whereTwo);

        if(requestOneCompleted && requestTwoCompleted) {
          B.triggerEvent('onCompleted', result);
        } else if(requestOneCompleted && requestTwoCompleted && !hasResultOne || !hasResultTwo)  {
          B.triggerEvent('onNoResult');
        }
        // Check if a result is present, then map this to chartData[] 1
        if (modelOneRes.data && !modelOneRes.loading) {

          modelOneRes.data.results.forEach((item) => {
            // Data set IDS
            chartData.id.push(item.id);
            // Data points 
            chartData.data.push(item[chartDataPropertyVal.name]);
            // Data labels
            chartData.labels.push(item[chartLabelPropertyVal.name]);
          });
        } else if (modelOneRes.error) {
          // TODO: CREATE ERRROR HANDLING
          dataError = true;
          dataErrorMsg.push(modelOneRes.error);
        };

        // Check if a result is present, then map this to chartData[] 2
        if (modelTwoRes.data && !modelTwoRes.loading) {

          modelTwoRes.data.results.forEach((item) => {
            // Data set IDS
            chartDataTwo.id.push(item.id);
            // Data points
            chartDataTwo.data.push(item[chartDataPropertyValTwo.name]);
            // Data labels
            chartDataTwo.labels.push(item[chartLabelPropertyValTwo.name]);
          })

          // Decide which of the models has more labels present.
          // This is used to display as the labels on the x-axes
          // If this is not done, the labels/data might not be displaying correctly
          if (chartData.labels >= chartDataTwo.labels) {

            chartDataLabels = chartData.labels;
          } else {

            chartDataLabels = chartDataTwo.labels;
          }
          // TODO: CREATE ERRROR HANDLING
        } else if (modelTwoRes.error) {

          dataError = true;
          dataErrorMsg.push(modelTwoRes.error);
        };
      } else {

        // If we're in DEV mode, than give the user an indication that data cannot be previewed here.
        chartData.data = [0];
        chartData.labels = ['Dynamic data can not be previewed in page builder'];
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

    // Styling Chart 1
    let colorOneValue = colorOne;


    if (lightenInnerOne) {
      colorOneValue = colorOne.replace(')', ', 0.1)');
    }

    // Styling Chart 2
    let colorTwoValue = colorTwo;

    if (lightenInnerTwo) {
      colorTwoValue = colorTwo.replace(')', ', 0.1)');
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


    useEffect(() => {
      B.defineFunction('Filter', ({ event, property, interactionId }) => {
        setInteractionFilter((s) => ({
          ...s,
          [interactionId]: {
            property,
            value: event.target
              ? event.target.value
              : transformValue(event),
          },
        }));
      })
    })

    const devChartId = 'devChart_' + getRandomInt(100, 20000);

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
            datasets: [
              // 1
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
                width: 20,
              },
              // 2
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
            ]
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
        borderRadiusOne,
        borderRadiusTwo,
        colorOne,
        colorTwo,
        color,
        chartData,
        chartLabelOne,
        chartLabelTwo,
        lightenInnerOne,
        lightenInnerTwo,
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
            datasets: [
              // 1
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
                width: 20,
              },
              // 2
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
            ]
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
        });

        return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
          myChart.destroy();
        }
      }, [
        chartData,
        chartDataTwo,
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
        font: 'Body1',
      },
    };
  },
}))();
