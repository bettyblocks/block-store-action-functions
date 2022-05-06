(() => ({
  name: 'Bar Chart',
  icon: 'TitleIcon',
  category: 'DATA',
  structure: [
    {
      name: 'Bar Chart',
      options: [
        {
          type: 'CUSTOM',
          label: 'Data Type',
          key: 'chartDataType',
          value: 'static',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Static',
                value: 'static',
              },
              {
                name: 'Dynamic',
                value: 'dynamic',
              },
            ],
          },
        },
        {
          type: 'TEXT',
          label: 'Data',
          key: 'staticData',
          value: '23\n38\n12\n7\n45',
          configuration: {
            as: 'MULTILINE',
            condition: {
              type: 'SHOW',
              option: 'chartDataType',
              comparator: 'EQ',
              value: 'static'
            },
          },
        },
        {
          type: 'TEXT',
          label: 'Data Labels',
          key: 'staticDataLabels',
          value: 'Monday\nTuesday\nWednesday\nThursday\nFriday',
          configuration: {
            as: 'MULTILINE',
            condition: {
              type: 'SHOW',
              option: 'chartDataType',
              comparator: 'EQ',
              value: 'static',
            }
          }
        },
        {
          type: 'MODEL',
          label: 'Model',
          key: 'model',
          value: '',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'chartDataType',
              comparator: 'EQ',
              value: 'dynamic',
            },
          },
        },
        {
          type: 'FILTER',
          label: 'Filter',
          key: 'filter',
          value: {},
          configuration: {
            dependsOn: 'model',
            condition: {
              type: 'SHOW',
              option: 'chartDataType',
              comparator: 'EQ',
              value: 'dynamic',
            },
          },
        },
        {
          type: 'PROPERTY',
          label: 'Order by',
          key: 'orderBy',
          value: '',
          configuration: {
            dependsOn: 'model',
            condition: {
              type: 'SHOW',
              option: 'chartDataType',
              comparator: 'EQ',
              value: 'dynamic',
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Sort order',
          key: 'order',
          value: 'asc',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            dependsOn: 'model',
            condition: {
              type: 'SHOW',
              option: 'chartDataType',
              comparator: 'EQ',
              value: 'dynamic',
            },
            allowedInput: [
              { name: 'Ascending', value: 'asc' },
              { name: 'Descending', value: 'desc' },
            ],
          },
        },
        {
          type: 'PROPERTY',
          label: 'Data',
          key: 'chartDataProperty',
          value: '',
          configuration: {
            dependsOn: 'model',
            condition: {
              type: 'SHOW',
              option: 'chartDataType',
              comparator: 'EQ',
              value: 'dynamic',
            },
          },
        },
        {
          type: 'PROPERTY',
          label: 'Data Label',
          key: 'chartLabelProperty',
          value: '',
          configuration: {
            dependsOn: 'model',
            condition: {
              type: 'SHOW',
              option: 'chartDataType',
              comparator: 'EQ',
              value: 'dynamic',
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Color',
          key: 'chartColor',
          value: 'rgb(255, 190, 11)',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Mango',
                value: 'rgb(255, 190, 11)',
              },
              {
                name: 'Dark Orange',
                value: 'rgb(253, 138, 9)'
              },
              {
                name: 'Orange Pantone',
                value: 'rgb(251, 86, 7)',
              },
              {
                name: 'Red Salsa',
                value: 'rgb(253, 43, 59)',
              },
              {
                name: 'Winter Sky',
                value: 'rgb(255, 0, 110)',
              },
              {
                name: 'Byzantine',
                value: 'rgb(193, 28, 173)'
              },
              {
                name: 'Blue Violet',
                value: 'rgb(131, 56, 236)',
              },
              {
                name: 'Neon Blue',
                value: 'rgb(95, 95, 246)',
              },
              {
                name: 'Azure',
                value: 'rgb(58, 134, 255)',
              },
            ],
          },
        },
        {
          type: 'TOGGLE',
          label: 'Custom Color',
          key: 'customBarColorToggle',
          value: false,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'showBarStyles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'TEXT',
          label: 'Custom Color (rgba)',
          key: 'customBarColor',
          value: '',
          configuration: {
            placeholder: 'Ex.: rgb(255, 190, 11)',
            condition: {
              type: 'SHOW',
              option: 'customBarColorToggle',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'TOGGLE',
          label: 'Lighten Inner Color',
          key: 'lightenInner',
          value: true,
        },
        {
          type: 'TEXT',
          label: 'Bar Thickness',
          key: 'thickness',
          value: '0.9',
          
        },
        {
          type: 'NUMBER',
          label: 'Border Width',
          key: 'borderWidth',
          value: '1',
        },
        {
          type: 'NUMBER',
          label: 'Border Radius',
          key: 'borderRadius',
          value: '0',
        },
        {
          type: 'CUSTOM',
          label: 'Skipped (excluded) border',
          key: 'borderSkipped',
          value: 'start',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Start',
                value: 'start',
              },
              {
                name: 'End',
                value: 'end',
              },
              {
                name: 'Middle',
                value: 'middle',
              },
              {
                name: 'Bottom',
                value: 'bottom',
              },
              {
                name: 'Left',
                value: 'left',
              },
              {
                name: 'Top',
                value: 'top',
              },
              {
                name: 'Right',
                value: 'right',
              },
              {
                name: 'Bottom',
                value: 'bottom',
              },
              {
                name: 'False',
                value: 'false'
              }
            ],
          },
        },
        {
          type: 'TOGGLE',
          label: 'Y-Axis begin at 0',
          key: 'yBeginAtZero',
          value: true,
        },
        {
          type: 'TOGGLE',
          label: 'Show Legend',
          key: 'showLegend',
          value: true,
        },
        {
          type: 'VARIABLE',
          label: 'Legend Text',
          key: 'chartLabel',
          value: ['# of tests'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'showLegend',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Legend Position',
          key: 'legendPosition',
          value: 'top',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Top',
                value: 'top',
              },
              {
                name: 'Left',
                value: 'left',
              },
              {
                name: 'Right',
                value: 'right',
              },
              {
                name: 'Bottom',
                value: 'bottom',
              },
            ],
            condition: {
              type: 'SHOW',
              option: 'showStyles',
              comparator: 'EQ',
              value: true,
            },
            condition: {
              type: 'SHOW',
              option: 'showLegend',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Legend Alignment',
          key: 'legendAlignment',
          value: 'center',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Start',
                value: 'start',
              },
              {
                name: 'Center',
                value: 'center',
              },
              {
                name: 'End',
                value: 'end'
              }
            ],
            condition: {
              type: 'SHOW',
              option: 'showLegend',
              comparator: 'EQ',
              value: true,
            },
          },
        },

        {
          type: 'CUSTOM',
          label: 'Legend Text Direction',
          key: 'legendTextDirection',
          value: 'ltr',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Left-to-right',
                value: 'ltr'
              },
              {
                name: 'Right-to-left',
                value: 'rtl',
              }
            ],
            condition: {
              type: 'SHOW',
              option: 'showLegend',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'TOGGLE',
          label: 'Show X-Axes Title',
          key: 'showXTitle',
          value: false,
        },
        {
          type: 'TEXT',
          label: 'X-Axes Title',
          key: 'xAxesTitle',
          value: '',
          configuration: {
            condition: {
              type: 'SHOW',
              comparator: 'EQ',
              option: 'showXTitle',
              value: true,
            }
          }
        },
        {
          type: 'TOGGLE',
          label: 'Show Y-Axes Title',
          key: 'showYTitle',
          value: false,
        },
        {
          type: 'TEXT',
          label: 'Y-Axes Title',
          key: 'yAxesTitle',
          value: '',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'showYTitle',
              comparator: 'EQ',
              value: true,
            }
          }
        },
        {
          type: 'CUSTOM',
          label: 'Background Type',
          key: 'backgroundType',
          value: 'color',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Color',
                value: 'color',
              },
              {
                name: 'Image',
                value: 'image',
              },
            ],
          }
        },
        {
          type: 'TEXT',
          label: 'Background Color',
          key: 'backgroundColorValue',
          value: '',
          configuration: {
            placeholder: 'rgba(255, 255, 255, 0)',
            condition: {
              type: 'SHOW',
              option: 'backgroundType',
              comparator: 'EQ',
              value: 'color'
            }
          }
        },
        {
          type: 'VARIABLE',
          label: 'Image URL',
          key: 'backgroundImageValue',
          value: ['https://www.chartjs.org/img/chartjs-logo.svg'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'backgroundType',
              comparator: 'EQ',
              value: 'image',
            }
          }
        },
        {
          type: 'CUSTOM',
          label: 'Tooltip',
          key: 'showTooltip',
          value: 'show',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Show',
                value: 'show'
              },
              {
                name: 'Disabled',
                value: 'disabled',
              },
            ]
          }
        },
        {
          type: 'CUSTOM',
          label: 'Tooltip Carrot X Alignment',
          key: 'tooltipXAlignment',
          value: 'center',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Left',
                value: 'left',
              },
              {
                name: 'Center',
                value: 'center',
              },
              {
                name: 'Right',
                value: 'right'
              }
            ],
            condition: {
              type: 'HIDE',
              option: 'showTooltip',
              comparator: 'EQ',
              value: 'disabled'
            }
          }
        },
        {
          type: 'CUSTOM',
          label: 'Tooltip Carrot Y Alignment',
          key: 'tooltipYAlignment',
          value: 'bottom',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Top',
                value: 'top',
              },
              {
                name: 'Center',
                value: 'center',
              },
              {
                name: 'Bottom',
                value: 'bottom'
              }
            ],
            condition: {
              type: 'HIDE',
              option: 'showTooltip',
              comparator: 'EQ',
              value: 'disabled'
            }
          }
        },
        {
          type: 'SIZES',
          label: 'Padding',
          key: 'padding',
          value: ['S', 'S', 'S', 'S'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'showStyles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
