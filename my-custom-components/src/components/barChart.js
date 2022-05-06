(() => ({
  name: 'Bar Chart',
  type: 'BODY_COMPONENT',
  icon: 'TitleIcon',
  orientation: 'HORIZONTAL',
  allowedTypes: [],
  jsx: (() => {
    const {
      Chart,
      BarElement,
      BarController,
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
      SubTitle } = window.ChartJS;
    const { Typography } = window.MaterialUI.Core

    // Register all charts elements to enable functionality
    Chart.register(
      BarElement,
      BarController,
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
    )
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const {
      chartLabel,
      color,
      backgroundType,
      backgroundColorValue,
      backgroundImageValue,
      customBarColorToggle,
      customBarColor,
      customBarBorderColor,
      chartDataProperty,
      chartLabelProperty,
      chartDataType,
      model,
      orderBy,
      order,
      filter,
      showLegend,
      legendPosition,
      legendTextDirection,
      legendTitle,
      legendAlignment,
      showLegendTitle,
      showTooltip,
      legendTitleFontSize,
      staticData,
      staticDataLabels,
      toggleCanvasBackgroundColor,
      tooltipXAlignment,
      tooltipYAlignment,
      yBeginAtZero,
      showXTitle,
      xAxesTitle,
      showYTitle,
      yAxesTitle,

      // Styling
      borderWidth,
      borderRadius,
      borderSkipped,
      chartColor,
      lightenInner,
      thickness,

    } = options;

    const {
      useAllQuery,
      getProperty,
      useFilter,
      env,
      useRelation
    } = B;
    const isDev = env === 'dev';
    const staticDataArray = staticData.split('\n');
    const chartLabelValue = staticDataLabels.split('\n');
    const where = useFilter(filter);
    const chartRef = React.createRef();
    const chartDataPropertyVal = getProperty(chartDataProperty);
    const chartLabelPropertyVal = getProperty(chartLabelProperty);
    const tooltipEnabled = showTooltip !== 'disabled' ? true : false;

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (min - max) + min);
    }

    let backgroundColorPlugin;
    let backgroundImagePlugin;

    const backgroundColor = backgroundColorValue === '' ? 'rgba(255, 255, 255, 0)' : backgroundColorValue


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


    let orderByPath = null;
    if (orderBy && Array.isArray(orderBy.id)) {
      orderByPath = orderBy.id;
    } else if (orderBy && orderBy.id) {
      orderByPath = [orderBy.id];
    }

    const sort =
      !isDev && orderByPath
        ? orderByPath.reduceRight((acc, property, index) => {
          const prop = getProperty(property);
          return index === orderByPath.length - 1
            ? { [prop.name]: order.toUpperCase() }
            : { [prop.name]: acc };
        }, {})
        : {};

    const { loading: queryLoading, error, data: queryData, refetch } =
      model && useAllQuery(model, {
        rawFilter: where,
        skip: 0,
        take: 20,
        variables: {
          ...(orderBy ? { sort: { relation: sort } } : {})
        },
        onCompleted(res) {
          const hasResult = res && res.result && res.result.length > 0;
          if (hasResult) {
            B.triggerEvent('onSuccess', res.results);
          } else {
            B.triggerEvent('onNoResults');
          }
        },
        onError(resp) {
          if (!displayError) {
            B.triggerEvent('onError', resp)
          }
        },
      },
        !model,
      );

    const { hasResults, data: relationData } = useRelation(
      model,
      {},
      typeof model === 'string' || !model,
    );



    const data = hasResults ? relationData : queryData;
    const isLoading = hasResults ? false : queryLoading;

    const { results = [], totalCount } = data || {};
    const chartData = {
      id: [],
      data: [],
      labels: [],
    }

    if (chartDataType === 'dynamic') {
      if (results && totalCount > 0 && !isLoading) {
        results.forEach((item) => {
          // Data set IDS
          chartData.id.push(item.id);
          // Data points 
          chartData.data.push(item[chartDataPropertyVal.name]);
          // Data labels
          chartData.labels.push(item[chartLabelPropertyVal.name]);
        });
      } else {
        chartData.data = [0];
        chartData.labels = ['Dynamic data can not be previewed in page builder'];
      }
    } else {
      for (let i = 1; i <= staticDataArray.length; i++) {
        chartData.id.push(i);
      }
      chartData.data = staticDataArray;
      chartData.labels = chartLabelValue;
    }

    const handleWindowSizeChange = () => {
      setWindowWidth(window.innerWidth);
    }

    let barColorValue;
    let barBorderColor;

    if (customBarColorToggle) {
      if (customBarColor && checkRegExp(customBarColor)) {
        barColorValue = customBarColor;
        barBorderColor = customBarColor;
      } else {
        barColorValue = chartColor;
        barBorderColor = chartColor;
      }
    } else {
      barColorValue = chartColor;
      barBorderColor = chartColor;
    }

    if (lightenInner) {
      barColorValue = barColorValue.replace(')', ', 0.1)');
    }


    // Check string for rgb format
    function checkRegExp(value) {
      const regex = new RegExp(/^(rgb)+([(0-9,\s])+([0-9,])+([\s0-9)]\B)/); // E.g: rgb(255, 255, 255) 
      return regex.test(value);                                             // OR rgb(255,255,255) return TRUE
    }

    function handleOnBarClick(e, chart) {
      const points = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);

      if (points.length) {
        const firstPoint = points[0];
        const index = firstPoint.index;
        const id = chartData.id[index];

        B.triggerEvent('onBarClick', id);
      }

    }

    const dataSet = [];

    if(chartData.id){
      dataSet.push(
        {
          label: chartLabel,
          data: chartData.data,
          backgroundColor: [
            barColorValue,
          ],
          borderColor: [
            barBorderColor,
          ],
          borderRadius,
          borderWidth,
          thickness,
          borderSkipped,
        }
      );
    }

    const devId = 'devChart_' + getRandomInt(100, 20000)

    if (isDev) {
      useEffect(() => {
        // OnMount component:

        // Event listener to make sure that the chart UI gets updated when the window size changes.
        // This leads to the window resizing nicely 
        window.addEventListener('resize', handleWindowSizeChange);
        const ctx = document.getElementById(devId)

        const devChart = new Chart(ctx, {
          // Chart options
          type: 'bar',
          data: {
            labels: chartData.labels,
            datasets: dataSet
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
              y: {
                beginAtZero: yBeginAtZero,
                title: {
                  display: showYTitle,
                  text: yAxesTitle,
                }
              },
              x: {
                title: {
                  display: showXTitle,
                  text: xAxesTitle,
                },
                callback: function(a, b , c) {
                  return a + ' ' + b;
                }
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
        borderRadius,
        borderWidth,
        borderSkipped,
        chartRef,
        windowWidth,
        chartLabel,
        chartColor,
        color,
        chartData,
        customBarColor,
        customBarBorderColor,
        customBarColorToggle,
        showLegend,
        legendAlignment,
        legendPosition,
        legendTextDirection,
        lightenInner,
        showLegendTitle,
        legendTitle,
        legendTitleFontSize,
        tooltipEnabled,
        tooltipXAlignment,
        tooltipYAlignment,
        staticDataArray,
        thickness,
        toggleCanvasBackgroundColor,
        yBeginAtZero
      ])
    } else {
      useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        const ctx = chartRef.current;

        const myChart = new Chart(ctx, {
          // Chart options
          type: 'bar',
          data: {
            labels: chartData.labels,
            datasets: dataSet,
          },
          options: {
            onClick: e => handleOnBarClick(e, myChart),
            events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
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
              }
            },
            scales: {
              y: {
                beginAtZero: yBeginAtZero,
              },
            },
          },
        });

        return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
          myChart.destroy();
        }
      }, [
        chartData,
        dataSet,
        isLoading,
      ])
    }


    return isDev ? (
      <canvas id={devId} className={classes.root}></canvas>
    ) : (
      <canvas ref={chartRef} className={classes.root}></canvas>
    );

  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    const font = {
      Body1: 'p'
    }
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
      },
    };
  },
}))();
