"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapper_1 = require("../mapper");
test('Autosuggest mapper builds the correct data object from non-empty v2 API response', () => {
    const apiResponse = {
        responseHeader: {
            zkConnected: true,
            status: 0,
            QTime: 0
        },
        response: {
            q: 'ch',
            suggestions: [
                {
                    q: 'christmas mini gift bags',
                    dq: 'christmas mini gift bags',
                    filters: [
                        {
                            name: 'Gifts',
                            value: '116734',
                            key: 'category'
                        },
                        {
                            name: 'Gift Wrap and Stationery',
                            value: '117289',
                            key: 'category'
                        }
                    ]
                },
                {
                    q: 'chairs',
                    dq: 'chairs'
                },
                {
                    q: 'dining chairs',
                    dq: 'dining chairs'
                }
            ],
            numFound: 15,
            products: [
                {
                    sale_price: 5.2,
                    url: 'https://pacifichome.bloomreach.com/products/90984?_br_psugg_q=christmas+mini+gift+bags',
                    pid: '90984',
                    thumb_image: 'https://pacific-demo-data.bloomreach.cloud/home/images/90984_XXX_v1.tif',
                    title: 'Mini Christmas Icon Kraft Gift Bags 6 Pack'
                },
                {
                    sale_price: 13.5,
                    url: 'https://pacifichome.bloomreach.com/products/another-product',
                    pid: '112233',
                    thumb_image: 'https://pacifichome.bloomreach.com/products/another-image.tif',
                    title: 'Example product title 12 Pack'
                }
            ]
        }
    };
    const allowingConfig = {
        get: (key) => {
            switch (key) {
                case 'numberOfCollections':
                    return 5;
                case 'numberOfProducts':
                    return 5;
                case 'numberOfTerms':
                    return 5;
            }
            return '';
        }
    };
    expect(mapper_1.AutosuggestMapper.buildFromV2Response(apiResponse, allowingConfig)).toMatchInlineSnapshot(`
    Object {
      "config": Object {
        "get": [Function],
      },
      "originalQuery": "ch",
      "productSuggestions": Array [
        Object {
          "final_price": 5.2,
          "id": "90984",
          "image": "https://pacific-demo-data.bloomreach.cloud/home/images/90984_XXX_v1.tif",
          "link": "https://pacifichome.bloomreach.com/products/90984?_br_psugg_q=christmas+mini+gift+bags",
          "pid": "90984",
          "sale_price": 5.2,
          "thumb_image": "https://pacific-demo-data.bloomreach.cloud/home/images/90984_XXX_v1.tif",
          "title": "Mini Christmas Icon Kraft Gift Bags 6 Pack",
          "url": "https://pacifichome.bloomreach.com/products/90984?_br_psugg_q=christmas+mini+gift+bags",
        },
        Object {
          "final_price": 13.5,
          "id": "112233",
          "image": "https://pacifichome.bloomreach.com/products/another-image.tif",
          "link": "https://pacifichome.bloomreach.com/products/another-product",
          "pid": "112233",
          "sale_price": 13.5,
          "thumb_image": "https://pacifichome.bloomreach.com/products/another-image.tif",
          "title": "Example product title 12 Pack",
          "url": "https://pacifichome.bloomreach.com/products/another-product",
        },
      ],
      "terms": Array [
        Object {
          "categories": Array [
            Object {
              "key": "category",
              "name": "Gifts",
              "type": "category",
              "value": "116734",
            },
            Object {
              "key": "category",
              "name": "Gift Wrap and Stationery",
              "type": "category",
              "value": "117289",
            },
          ],
          "displayText": "christmas mini gift bags",
          "dq": "christmas mini gift bags",
          "filters": Array [
            Object {
              "key": "category",
              "name": "Gifts",
              "value": "116734",
            },
            Object {
              "key": "category",
              "name": "Gift Wrap and Stationery",
              "value": "117289",
            },
          ],
          "link": "?=christmas%20mini%20gift%20bags",
          "q": "christmas mini gift bags",
          "text": "christmas mini gift bags",
        },
        Object {
          "displayText": "chairs",
          "dq": "chairs",
          "link": "?=chairs",
          "q": "chairs",
          "text": "chairs",
        },
        Object {
          "displayText": "dining chairs",
          "dq": "dining chairs",
          "link": "?=dining%20chairs",
          "q": "dining chairs",
          "text": "dining chairs",
        },
      ],
    }
  `);
    const restrictingConfig = {
        get: (key) => {
            switch (key) {
                case 'numberOfCollections':
                    return 1;
                case 'numberOfProducts':
                    return 1;
                case 'numberOfTerms':
                    return 2;
            }
            return '';
        }
    };
    expect(mapper_1.AutosuggestMapper.buildFromV2Response(apiResponse, restrictingConfig)).toMatchInlineSnapshot(`
    Object {
      "config": Object {
        "get": [Function],
      },
      "originalQuery": "ch",
      "productSuggestions": Array [
        Object {
          "final_price": 5.2,
          "id": "90984",
          "image": "https://pacific-demo-data.bloomreach.cloud/home/images/90984_XXX_v1.tif",
          "link": "https://pacifichome.bloomreach.com/products/90984?_br_psugg_q=christmas+mini+gift+bags",
          "pid": "90984",
          "sale_price": 5.2,
          "thumb_image": "https://pacific-demo-data.bloomreach.cloud/home/images/90984_XXX_v1.tif",
          "title": "Mini Christmas Icon Kraft Gift Bags 6 Pack",
          "url": "https://pacifichome.bloomreach.com/products/90984?_br_psugg_q=christmas+mini+gift+bags",
        },
      ],
      "terms": Array [
        Object {
          "categories": Array [
            Object {
              "key": "category",
              "name": "Gifts",
              "type": "category",
              "value": "116734",
            },
          ],
          "displayText": "christmas mini gift bags",
          "dq": "christmas mini gift bags",
          "filters": Array [
            Object {
              "key": "category",
              "name": "Gifts",
              "value": "116734",
            },
            Object {
              "key": "category",
              "name": "Gift Wrap and Stationery",
              "value": "117289",
            },
          ],
          "link": "?=christmas%20mini%20gift%20bags",
          "q": "christmas mini gift bags",
          "text": "christmas mini gift bags",
        },
        Object {
          "displayText": "chairs",
          "dq": "chairs",
          "link": "?=chairs",
          "q": "chairs",
          "text": "chairs",
        },
      ],
    }
  `);
});
test('Autosuggest mapper builds the correct data object from empty v2 API response', () => {
    const apiResponse = {
        responseHeader: {
            zkConnected: true,
            status: 0,
            QTime: 0
        },
        response: {}
    };
    const config = {
        get: (key) => {
            switch (key) {
                case 'numberOfCollections':
                    return 5;
                case 'numberOfProducts':
                    return 5;
                case 'numberOfTerms':
                    return 5;
            }
            return '';
        }
    };
    expect(mapper_1.AutosuggestMapper.buildFromV2Response(apiResponse, config)).toMatchInlineSnapshot(`
    Object {
      "config": Object {
        "get": [Function],
      },
      "productSuggestions": Array [],
      "terms": Array [],
    }
  `);
});
