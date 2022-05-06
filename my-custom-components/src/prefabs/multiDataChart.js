(() => ({
  name: 'Multi Data Chart',
  icon: 'TitleIcon',
  category: 'DATA',
  structure: [
    {
      name: 'Multi Data Chart',
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
          label: 'Data | 1',
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
          label: 'Data | 2',
          key: 'staticDataTwo',
          value: '10\n23\n3\n1\n21',
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
          type: 'PROPERTY',
          label: 'Data Points | 1',
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
          label: 'Data Points | 2',
          key: 'chartDataPropertyTwo',
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
          label: 'Data Points | 3',
          key: 'chartDataPropertyThree',
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
          label: 'Data Labels',
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
          type: 'VARIABLE',
          label: 'Legend Text | 1',
          key: 'legendOne',
          value: ['# of tests'],
          configuration: {
            dependsOn: 'model',
            condition: {
              type: 'SHOW',
              option: 'showLegend',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Legend Text | 2',
          key: 'legendTwo',
          value: ['# of positive results'],
          configuration: {
            dependsOn: 'model',
            condition: {
              type: 'SHOW',
              option: 'showLegend',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Legend Text | 3',
          key: 'legendThree',
          value: ['# of positive results'],
          configuration: {
            dependsOn: 'model',
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
          label: 'Chart 1 Type',
          key: 'chartTypeOne',
          value: 'bar',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Bar',
                value: 'bar',
              },
              {
                name: 'Line',
                value: 'line',
              },
            ],
          },
        },
        {
          type: 'CUSTOM',
          label: 'Color | Chart 1',
          key: 'colorOne',
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
          label: 'Toggle Fill | Chart 1',
          key: 'fillOne',
          value: false,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'chartTypeOne',
              comparator: 'EQ',
              value: 'line'
            }
          }
        },
        {
          type: 'TOGGLE',
          label: 'Lighten Inner Color | Chart 1',
          key: 'lightenInnerOne',
          value: true,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'chartTypeOne',
              comparator: 'EQ',
              value: 'bar',
            },
          },
        },
        {
          type: 'TEXT',
          label: 'Bar Thickness | Chart 1',
          key: 'thicknessOne',
          value: '0.9',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'chartTypeOne',
              comparator: 'EQ',
              value: 'bar',
            }
          }
        },
        {
          type: 'NUMBER',
          label: 'Border Width | Chart 1',
          key: 'borderWidthOne',
          value: '1',
        },
        {
          type: 'NUMBER',
          label: 'Border Radius | Chart 1',
          key: 'borderRadiusOne',
          value: '0',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'chartTypeOne',
              comparator: 'EQ',
              value: 'bar',
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Line Tension | Chart 1',
          key: 'tensionOne',
          value: '0.1',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Disabled',
                value: '0',
              },
              {
                name: 'Low',
                value: '0.1',
              },
              {
                name: 'Medium',
                value: '0.3',
              },
              {
                name: 'High',
                value: '0.5'
              }
            ],
            condition: {
              type: 'SHOW',
              option: 'chartTypeOne',
              comparator: 'EQ',
              value: 'line'
            }
          }
        },
        {
          type: 'CUSTOM',
          label: 'Chart 2 Type',
          key: 'chartTypeTwo',
          value: 'line',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Bar',
                value: 'bar',
              },
              {
                name: 'Line',
                value: 'line',
              },
            ],
          },
        },
        {
          type: 'CUSTOM',
          label: 'Color | Chart 2',
          key: 'colorTwo',
          value: 'rgb(253, 43, 59)',
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
          label: 'Toggle Fill | Chart 2',
          key: 'fillTwo',
          value: false,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'chartTypeTwo',
              comparator: 'EQ',
              value: 'line'
            }
          }
        },
        {
          type: 'TOGGLE',
          label: 'Lighten Inner Color | Chart 2',
          key: 'lightenInnerTwo',
          value: true,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'chartTypeTwo',
              comparator: 'EQ',
              value: 'bar',
            },
          },
        },
        {
          type: 'TEXT',
          label: 'Bar Thickness | Chart 2',
          key: 'thicknessTwo',
          value: '0.9',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'chartTypeTwo',
              comparator: 'EQ',
              value: 'bar',
            }
          }
        },
        {
          type: 'NUMBER',
          label: 'Border Width | Chart 2',
          key: 'borderWidthTwo',
          value: '2',
        },
        {
          type: 'NUMBER',
          label: 'Border Radius | Chart 2',
          key: 'borderRadiusTwo',
          value: '0',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'chartTypeTwo',
              comparator: 'EQ',
              value: 'bar',
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Line Tension | Chart 2',
          key: 'tensionTwo',
          value: '0.1',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Disabled',
                value: '0',
              },
              {
                name: 'Low',
                value: '0.1',
              },
              {
                name: 'Medium',
                value: '0.3',
              },
              {
                name: 'High',
                value: '0.5'
              }
            ],
            condition: {
              type: 'SHOW',
              option: 'chartTypeTwo',
              comparator: 'EQ',
              value: 'line'
            }
          }
        },
        {
          type: 'CUSTOM',
          label: 'Chart 3 Type',
          key: 'chartTypeThree',
          value: 'line',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Bar',
                value: 'bar',
              },
              {
                name: 'Line',
                value: 'line',
              },
            ],
          },
        },
        {
          type: 'CUSTOM',
          label: 'Color | Chart 3',
          key: 'colorThree',
          value: 'rgb(251, 86, 7)',
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
          label: 'Toggle Fill | Chart 3',
          key: 'fillThree',
          value: false,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'chartTypeThree',
              comparator: 'EQ',
              value: 'line'
            }
          }
        },
        {
          type: 'TOGGLE',
          label: 'Lighten Inner Color | Chart 3',
          key: 'lightenInnerThree',
          value: true,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'chartTypeThree',
              comparator: 'EQ',
              value: 'bar',
            },
          },
        },
        {
          type: 'TEXT',
          label: 'Bar Thickness | Chart 3',
          key: 'thicknessThree',
          value: '0.9',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'chartTypeThree',
              comparator: 'EQ',
              value: 'bar',
            }
          }
        },
        {
          type: 'NUMBER',
          label: 'Border Width | Chart 3',
          key: 'borderWidthThree',
          value: '2',
        },
        {
          type: 'NUMBER',
          label: 'Border Radius | Chart 3',
          key: 'borderRadiusThree',
          value: '0',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'chartTypeTwo',
              comparator: 'EQ',
              value: 'bar',
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Line Tension | Chart 3',
          key: 'tensionThree',
          value: '0.1',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Disabled',
                value: '0',
              },
              {
                name: 'Low',
                value: '0.1',
              },
              {
                name: 'Medium',
                value: '0.3',
              },
              {
                name: 'High',
                value: '0.5'
              }
            ],
            condition: {
              type: 'SHOW',
              option: 'chartTypeThree',
              comparator: 'EQ',
              value: 'line'
            }
          }
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
          type: 'VARIABLE',
          label: 'Legend Title',
          key: 'legendTitle',
          value: [],
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
          type: 'FONT',
          label: 'Title Font-size',
          key: 'legendTitleFontSize',
          value: 'Title1',
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
          type: 'TEXT',
          label: 'X-Axes Label Adornment',
          key: 'xAxesAdornment',
          value: '',
        },
        {
          type: 'CUSTOM',
          label: 'X-Axes Adornment Position',
          key: 'xAxesAdornmentPos',
          value: 'start',
          configuration: {
            as: 'BUTTONGROUP',
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
            ],
          },
        },
        {
          type: 'CUSTOM',
          label: 'Y-Axes Configuration',
          key: 'yAxesConfig',
          value: 'linear',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Linear Axes',
                value: 'linear',
              },
              {
                name: 'Logarithmic Axes',
                value: 'logarithmic',
              },
            ]
          }
        },
        { 
          type: 'TEXT',
          label: 'Y-Axes Label Adornment',
          key: 'yAxesAdornment',
          value: '$',
        },
        {
          type: 'CUSTOM',
          label: 'Adornment Position',
          key: 'yAxesAdornmentPos',
          value: 'start',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Start',
                value: 'start',
              },
              {
                name: 'End',
                value: 'end,'
              }
            ]
          }
        },
        {
          type: 'CUSTOM',
          label: 'Error Message',
          key: 'showError',
          value: 'built-in',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Built-In',
                value: 'built-in',
              },
              {
                name: 'Interaction',
                value: 'interaction',
              }
            ]
          }
        },
        {
          value: '',
          label: 'Current Record',
          key: 'currentRecord',
          type: 'NUMBER',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'currentRecord',
              comparator: 'EQ',
              value: 'never',
            },
          },
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
