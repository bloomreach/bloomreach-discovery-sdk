"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapper_1 = require("../mapper");
test('PathwaysAndRecommendations mapper builds the correct data object from non-empty v2 API response', () => {
    const apiResponse = {
        response: {
            numFound: 1,
            start: 0,
            docs: [
                {
                    url: 'https://pacifichome.bloomreach.com/products/83554',
                    thumb_image: 'https://pacific-demo-data.bloomreach.cloud/home/images/83554_XXX_v1.tif',
                    pid: '83554',
                    sale_price: 12.26,
                    price: 18.86,
                    title: 'White Waffle Weave Cotton Bath Towel'
                }
            ]
        },
        metadata: {
            widget: {
                id: 'pWb1zD',
                name: 'FrequentlyBoughtTogether',
                description: 'Frequently Bought Together',
                type: 'co_viewed',
                rid: 'e6904c3dc3854bf98034e8cbf2c38a0a'
            },
            query: {},
            response: {
                personalized_results: false,
                fallback: 'mlt',
                recall: 'fallback'
            }
        }
    };
    const config = {
        get: () => false
    };
    expect(mapper_1.PathwaysAndRecommendationsMapper.buildFromV2Response(apiResponse, config)).toMatchInlineSnapshot(`
    Object {
      "config": Object {
        "get": [Function],
      },
      "products": Array [
        Object {
          "final_price": 12.26,
          "id": "83554",
          "image": "https://pacific-demo-data.bloomreach.cloud/home/images/83554_XXX_v1.tif",
          "link": "https://pacifichome.bloomreach.com/products/83554",
          "pid": "83554",
          "price": 18.86,
          "sale_price": 12.26,
          "thumb_image": "https://pacific-demo-data.bloomreach.cloud/home/images/83554_XXX_v1.tif",
          "title": "White Waffle Weave Cotton Bath Towel",
          "url": "https://pacifichome.bloomreach.com/products/83554",
        },
      ],
      "widgetMetadata": Object {
        "description": "Frequently Bought Together",
        "id": "pWb1zD",
        "name": "FrequentlyBoughtTogether",
        "rid": "e6904c3dc3854bf98034e8cbf2c38a0a",
        "type": "co_viewed",
      },
    }
  `);
});
test('PathwaysAndRecommendations mapper builds the correct data object from empty v2 API response', () => {
    const apiResponse = {
        response: { numFound: 0, start: 0, docs: [] },
        metadata: {
            widget: {
                id: 'pWbBzW',
                name: 'Past Purchases Personalized',
                description: 'Past Purchases Personalized Widget',
                type: 'past_purchases',
                rid: 'c84066d648404525bb42a23b3a53f45b'
            },
            query: {},
            response: { personalized_results: false, fallback: '', recall: 'pure' }
        }
    };
    const config = {
        key: 'value'
    };
    expect(mapper_1.PathwaysAndRecommendationsMapper.buildFromV2Response(apiResponse, config)).toMatchInlineSnapshot(`
    Object {
      "config": Object {
        "key": "value",
      },
      "products": Array [],
      "widgetMetadata": Object {
        "description": "Past Purchases Personalized Widget",
        "id": "pWbBzW",
        "name": "Past Purchases Personalized",
        "rid": "c84066d648404525bb42a23b3a53f45b",
        "type": "past_purchases",
      },
    }
  `);
});
