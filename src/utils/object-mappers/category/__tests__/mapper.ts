import {CategoryConfig} from '../../../../config/category'
import {CategoryMapper} from '../mapper'

test('Category mapper builds the correct data object from non-empty v2 API response', () => {
  const apiResponse = {
    response: {
      numFound: 9,
      start: 0,
      docs: [
        {
          sale_price: 192.99,
          price: 296.91,
          description:
            'Featuring a handwoven rattan seat and back, our Willis chair offers a minimalist twist on a classic. Its wingback silhouette is paired with sleek black metal legs for bold look and a comfy seat.',
          title: 'Black Rattan Willis Wingback Chair',
          url: 'https://pacifichome.bloomreach.com/products/78330',
          brand: '',
          pid: '78330',
          thumb_image:
            'https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif',
          sale_price_range: [161.99, 161.99],
          price_range: [296.91, 296.91],
          sizes: [],
          variants: [
            {
              sku_color_group: 'Black',
              sku_swatch_images: ['556689'],
              sku_thumb_images: [
                'https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif'
              ]
            }
          ]
        },
        {
          sale_price: 425.96,
          price: 655.32,
          description:
            'Boasting a curved, shapely silhouette, our Blue Linen Paige Round Back Dining Chairs define simple elegance. Crafted of white American oak, they feature a distressed finish that adds to their classic appeal.',
          title: 'Blue Linen Paige Round Back Dining Chairs, Set of 2',
          url: 'https://pacifichome.bloomreach.com/products/35527',
          brand: '',
          pid: '35527',
          thumb_image:
            'https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif',
          sale_price_range: [275.98, 275.98],
          price_range: [655.32, 655.32],
          sizes: [],
          variants: [
            {
              sku_color_group: 'Blue',
              sku_swatch_images: ['10008031'],
              sku_thumb_images: [
                'https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif'
              ]
            }
          ]
        },
        {
          sale_price: 108.61,
          price: 127.68,
          description:
            'Crafted of solid rubberwood and acacia wood, our petite chairs boast a low profile that makes them ideal for small dining areas. These traditional side chairs are finished in weathered gray with visible wood grain for a textural appeal.',
          title: 'Weathered Gray Wood Jozy Dining Chairs Set of 2',
          url: 'https://pacifichome.bloomreach.com/products/60765',
          brand: '',
          pid: '60765',
          thumb_image:
            'https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif',
          sale_price_range: [139.98, 139.98],
          price_range: [127.68, 127.68],
          sizes: [],
          variants: [
            {
              sku_color_group: 'Gray',
              sku_swatch_images: ['526102'],
              sku_thumb_images: [
                'https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif'
              ]
            }
          ]
        }
      ]
    },
    facet_counts: {
      facet_ranges: {},
      facet_fields: {
        category: [
          {
            count: 9,
            crumb: '/123',
            cat_name: 'Marketing Groups',
            parent: '',
            cat_id: '123',
            tree_path: '/123,Marketing Groups'
          },
          {
            count: 7,
            crumb: '/117419',
            cat_name: 'Sale',
            parent: '',
            cat_id: '117419',
            tree_path: '/117419,Sale'
          },
          {
            count: 7,
            crumb: '/123/147',
            cat_name: '2019 November Furniture SKUs',
            parent: '123',
            cat_id: '147',
            tree_path: '/123,Marketing Groups/147,2019 November Furniture SKUs'
          }
        ],
        sizes: [],
        brand: [],
        colors: [
          {
            count: 3,
            name: 'gray'
          },
          {
            count: 2,
            name: 'blue'
          }
        ],
        color_groups: [
          {
            count: 3,
            name: 'gray'
          },
          {
            count: 2,
            name: 'blue'
          },
          {
            count: 1,
            name: 'black'
          }
        ],
        pickUpInStore: [
          {
            count: 5,
            name: 'true'
          },
          {
            count: 4,
            name: 'false'
          }
        ],
        reviews: [
          {
            count: 3,
            name: '4.7'
          },
          {
            count: 2,
            name: '0.0'
          },
          {
            count: 2,
            name: '5.0'
          }
        ],
        is_new: [
          {
            count: 9,
            name: 'false'
          }
        ],
        OnlineOnly: [
          {
            count: 1,
            name: 'false'
          },
          {
            count: 2,
            name: 'true'
          }
        ],
        rating: [
          {
            count: 3,
            name: '4.7'
          },
          {
            count: 2,
            name: '0.0'
          },
          {
            count: 2,
            name: '5.0'
          }
        ],
        inStoreOnly: [
          {
            count: 1,
            name: 'false'
          },
          {
            count: 2,
            name: 'true'
          }
        ],
        shipToStore: [
          {
            count: 1,
            name: 'false'
          },
          {
            count: 2,
            name: 'true'
          }
        ],
        reviews_count: [
          {
            count: 3,
            name: '1.0'
          },
          {
            count: 2,
            name: '0.0'
          },
          {
            count: 1,
            name: '18.0'
          }
        ],
        material: [
          {
            count: 2,
            name: 'Wood'
          },
          {
            count: 1,
            name: 'Metal|Natural Fiber|Rattan'
          }
        ]
      },
      facet_queries: {}
    },
    category_map: {
      '151': '2019 Wk 6 20% off Outdoor',
      '150': 'Fall Furniture Coupon',
      '117421': 'Outdoor'
    }
  }

  const config = ({
    get: () => false
  } as unknown) as CategoryConfig

  expect(CategoryMapper.buildFromV2Response(apiResponse, config))
    .toMatchInlineSnapshot(`
    Object {
      "config": Object {
        "get": [Function],
      },
      "facets": Array [
        Object {
          "original_title": "category",
          "section": Array [
            Object {
              "count": 9,
              "id": "123",
              "name": "Marketing Groups",
            },
            Object {
              "count": 7,
              "id": "117419",
              "name": "Sale",
            },
            Object {
              "count": 7,
              "id": "147",
              "name": "2019 November Furniture SKUs",
            },
          ],
          "title": "Category",
        },
        Object {
          "original_title": "sizes",
          "section": Array [],
          "title": "Sizes",
        },
        Object {
          "original_title": "brand",
          "section": Array [],
          "title": "Brand",
        },
        Object {
          "original_title": "colors",
          "section": Array [
            Object {
              "count": 3,
              "id": "gray",
              "name": "gray",
            },
            Object {
              "count": 2,
              "id": "blue",
              "name": "blue",
            },
          ],
          "title": "Colors",
        },
        Object {
          "original_title": "color_groups",
          "section": Array [
            Object {
              "count": 3,
              "id": "gray",
              "name": "gray",
            },
            Object {
              "count": 2,
              "id": "blue",
              "name": "blue",
            },
            Object {
              "count": 1,
              "id": "black",
              "name": "black",
            },
          ],
          "title": "Color Groups",
        },
        Object {
          "original_title": "pickUpInStore",
          "section": Array [
            Object {
              "count": 5,
              "id": "Yes",
              "name": "Yes",
            },
            Object {
              "count": 4,
              "id": "No",
              "name": "No",
            },
          ],
          "title": "PickUpInStore",
        },
        Object {
          "original_title": "reviews",
          "section": Array [
            Object {
              "count": 3,
              "id": "4.7",
              "name": "4.7",
            },
            Object {
              "count": 2,
              "id": "0.0",
              "name": "0.0",
            },
            Object {
              "count": 2,
              "id": "5.0",
              "name": "5.0",
            },
          ],
          "title": "Reviews",
        },
        Object {
          "original_title": "is_new",
          "section": Array [
            Object {
              "count": 9,
              "id": "No",
              "name": "No",
            },
          ],
          "title": "Is New",
        },
        Object {
          "original_title": "OnlineOnly",
          "section": Array [
            Object {
              "count": 1,
              "id": "No",
              "name": "No",
            },
            Object {
              "count": 2,
              "id": "Yes",
              "name": "Yes",
            },
          ],
          "title": "OnlineOnly",
        },
        Object {
          "original_title": "rating",
          "section": Array [
            Object {
              "count": 3,
              "id": "4.7",
              "name": "4.7",
            },
            Object {
              "count": 2,
              "id": "0.0",
              "name": "0.0",
            },
            Object {
              "count": 2,
              "id": "5.0",
              "name": "5.0",
            },
          ],
          "title": "Rating",
        },
        Object {
          "original_title": "inStoreOnly",
          "section": Array [
            Object {
              "count": 1,
              "id": "No",
              "name": "No",
            },
            Object {
              "count": 2,
              "id": "Yes",
              "name": "Yes",
            },
          ],
          "title": "InStoreOnly",
        },
        Object {
          "original_title": "shipToStore",
          "section": Array [
            Object {
              "count": 1,
              "id": "No",
              "name": "No",
            },
            Object {
              "count": 2,
              "id": "Yes",
              "name": "Yes",
            },
          ],
          "title": "ShipToStore",
        },
        Object {
          "original_title": "reviews_count",
          "section": Array [
            Object {
              "count": 3,
              "id": "1.0",
              "name": "1.0",
            },
            Object {
              "count": 2,
              "id": "0.0",
              "name": "0.0",
            },
            Object {
              "count": 1,
              "id": "18.0",
              "name": "18.0",
            },
          ],
          "title": "Reviews Count",
        },
        Object {
          "original_title": "material",
          "section": Array [
            Object {
              "count": 2,
              "id": "Wood",
              "name": "Wood",
            },
            Object {
              "count": 1,
              "id": "Metal|Natural Fiber|Rattan",
              "name": "Metal|Natural Fiber|Rattan",
            },
          ],
          "title": "Material",
        },
      ],
      "number_of_results": 9,
      "products": Array [
        Object {
          "brand": "",
          "description": "Featuring a handwoven rattan seat and back, our Willis chair offers a minimalist twist on a classic. Its wingback silhouette is paired with sleek black metal legs for bold look and a comfy seat.",
          "final_price": 192.99,
          "id": "78330",
          "image": "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
          "link": "https://pacifichome.bloomreach.com/products/78330",
          "pid": "78330",
          "price": 296.91,
          "price_range": Array [
            296.91,
            296.91,
          ],
          "sale_price": 192.99,
          "sale_price_range": Array [
            161.99,
            161.99,
          ],
          "sizes": Array [],
          "thumb_image": "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
          "title": "Black Rattan Willis Wingback Chair",
          "url": "https://pacifichome.bloomreach.com/products/78330",
          "variants": Array [
            Object {
              "image": "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
              "sku_color_group": "Black",
              "sku_swatch_images": Array [
                "556689",
              ],
              "sku_thumb_images": Array [
                "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
              ],
              "variant_name": "Black",
            },
          ],
        },
        Object {
          "brand": "",
          "description": "Boasting a curved, shapely silhouette, our Blue Linen Paige Round Back Dining Chairs define simple elegance. Crafted of white American oak, they feature a distressed finish that adds to their classic appeal.",
          "final_price": 425.96,
          "id": "35527",
          "image": "https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif",
          "link": "https://pacifichome.bloomreach.com/products/35527",
          "pid": "35527",
          "price": 655.32,
          "price_range": Array [
            655.32,
            655.32,
          ],
          "sale_price": 425.96,
          "sale_price_range": Array [
            275.98,
            275.98,
          ],
          "sizes": Array [],
          "thumb_image": "https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif",
          "title": "Blue Linen Paige Round Back Dining Chairs, Set of 2",
          "url": "https://pacifichome.bloomreach.com/products/35527",
          "variants": Array [
            Object {
              "image": "https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif",
              "sku_color_group": "Blue",
              "sku_swatch_images": Array [
                "10008031",
              ],
              "sku_thumb_images": Array [
                "https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif",
              ],
              "variant_name": "Blue",
            },
          ],
        },
        Object {
          "brand": "",
          "description": "Crafted of solid rubberwood and acacia wood, our petite chairs boast a low profile that makes them ideal for small dining areas. These traditional side chairs are finished in weathered gray with visible wood grain for a textural appeal.",
          "final_price": 108.61,
          "id": "60765",
          "image": "https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif",
          "link": "https://pacifichome.bloomreach.com/products/60765",
          "pid": "60765",
          "price": 127.68,
          "price_range": Array [
            127.68,
            127.68,
          ],
          "sale_price": 108.61,
          "sale_price_range": Array [
            139.98,
            139.98,
          ],
          "sizes": Array [],
          "thumb_image": "https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif",
          "title": "Weathered Gray Wood Jozy Dining Chairs Set of 2",
          "url": "https://pacifichome.bloomreach.com/products/60765",
          "variants": Array [
            Object {
              "image": "https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif",
              "sku_color_group": "Gray",
              "sku_swatch_images": Array [
                "526102",
              ],
              "sku_thumb_images": Array [
                "https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif",
              ],
              "variant_name": "Gray",
            },
          ],
        },
      ],
      "start": 0,
    }
  `)
})

test('Category mapper builds the correct data object from empty v2 API response', () => {
  const apiResponse = {
    response: {
      numFound: 0,
      start: 0,
      docs: []
    },
    facet_counts: {
      facet_ranges: {},
      facet_fields: {
        category: [],
        sizes: [],
        brand: [],
        colors: [],
        color_groups: []
      },
      facet_queries: {}
    },
    category_map: {}
  }

  const config = ({
    key: 'value'
  } as unknown) as CategoryConfig

  expect(CategoryMapper.buildFromV2Response(apiResponse, config))
    .toMatchInlineSnapshot(`
    Object {
      "config": Object {
        "key": "value",
      },
      "facets": Array [
        Object {
          "original_title": "category",
          "section": Array [],
          "title": "Category",
        },
        Object {
          "original_title": "sizes",
          "section": Array [],
          "title": "Sizes",
        },
        Object {
          "original_title": "brand",
          "section": Array [],
          "title": "Brand",
        },
        Object {
          "original_title": "colors",
          "section": Array [],
          "title": "Colors",
        },
        Object {
          "original_title": "color_groups",
          "section": Array [],
          "title": "Color Groups",
        },
      ],
      "number_of_results": 0,
      "products": Array [],
      "start": 0,
    }
  `)
})

test('Category mapper builds the correct data object from v2 API response when the Display Variants setting is on', () => {
  const apiResponse = {
    response: {
      numFound: 2,
      start: 0,
      docs: [
        {
          sale_price: 192.99,
          price: 296.91,
          description:
            'Featuring a handwoven rattan seat and back, our Willis chair offers a minimalist twist on a classic. Its wingback silhouette is paired with sleek black metal legs for bold look and a comfy seat.',
          title: 'Black Rattan Willis Wingback Chair',
          url: 'https://pacifichome.bloomreach.com/products/78330',
          brand: '',
          pid: '78330',
          thumb_image:
            'https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif',
          sale_price_range: [161.99, 161.99],
          price_range: [296.91, 296.91],
          sizes: [],
          variants: [
            {
              sku_color_group: 'Black',
              sku_swatch_images: ['556689'],
              sku_thumb_images: [
                'https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif'
              ]
            },
            {
              sku_color_group: 'Blue',
              sku_swatch_images: ['10008031'],
              sku_thumb_images: [
                'https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif'
              ]
            },
            {
              sku_color_group: 'Gray',
              sku_swatch_images: ['526102'],
              sku_thumb_images: [
                'https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif'
              ]
            }
          ]
        },
        {
          sale_price: 425.96,
          price: 655.32,
          description:
            'Boasting a curved, shapely silhouette, our Blue Linen Paige Round Back Dining Chairs define simple elegance. Crafted of white American oak, they feature a distressed finish that adds to their classic appeal.',
          title: 'Blue Linen Paige Round Back Dining Chairs, Set of 2',
          url: 'https://pacifichome.bloomreach.com/products/35527',
          brand: '',
          pid: '35527',
          thumb_image:
            'https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif',
          sale_price_range: [275.98, 275.98],
          price_range: [655.32, 655.32],
          sizes: [],
          variants: []
        }
      ]
    },
    facet_counts: {
      facet_ranges: {},
      facet_fields: {
        category: [],
        sizes: [],
        brand: [],
        colors: [],
        color_groups: []
      },
      facet_queries: {}
    },
    category_map: {}
  }

  const config = ({
    get: () => true
  } as unknown) as CategoryConfig

  expect(CategoryMapper.buildFromV2Response(apiResponse, config))
    .toMatchInlineSnapshot(`
    Object {
      "config": Object {
        "get": [Function],
      },
      "facets": Array [
        Object {
          "original_title": "category",
          "section": Array [],
          "title": "Category",
        },
        Object {
          "original_title": "sizes",
          "section": Array [],
          "title": "Sizes",
        },
        Object {
          "original_title": "brand",
          "section": Array [],
          "title": "Brand",
        },
        Object {
          "original_title": "colors",
          "section": Array [],
          "title": "Colors",
        },
        Object {
          "original_title": "color_groups",
          "section": Array [],
          "title": "Color Groups",
        },
      ],
      "number_of_results": 2,
      "products": Array [
        Object {
          "brand": "",
          "description": "Featuring a handwoven rattan seat and back, our Willis chair offers a minimalist twist on a classic. Its wingback silhouette is paired with sleek black metal legs for bold look and a comfy seat.",
          "final_price": 192.99,
          "id": "78330",
          "image": "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
          "link": "https://pacifichome.bloomreach.com/products/78330",
          "pid": "78330",
          "price": 296.91,
          "price_range": Array [
            296.91,
            296.91,
          ],
          "sale_price": 192.99,
          "sale_price_range": Array [
            161.99,
            161.99,
          ],
          "sizes": Array [],
          "sku_color_group": "Black",
          "sku_swatch_images": Array [
            "556689",
          ],
          "sku_thumb_images": Array [
            "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
          ],
          "thumb_image": "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
          "title": "Black Rattan Willis Wingback Chair",
          "url": "https://pacifichome.bloomreach.com/products/78330",
          "variant_name": "Black",
          "variants": Array [
            Object {
              "image": "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
              "sku_color_group": "Black",
              "sku_swatch_images": Array [
                "556689",
              ],
              "sku_thumb_images": Array [
                "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
              ],
              "variant_name": "Black",
            },
            Object {
              "image": "https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif",
              "sku_color_group": "Blue",
              "sku_swatch_images": Array [
                "10008031",
              ],
              "sku_thumb_images": Array [
                "https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif",
              ],
              "variant_name": "Blue",
            },
            Object {
              "image": "https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif",
              "sku_color_group": "Gray",
              "sku_swatch_images": Array [
                "526102",
              ],
              "sku_thumb_images": Array [
                "https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif",
              ],
              "variant_name": "Gray",
            },
          ],
        },
        Object {
          "brand": "",
          "description": "Featuring a handwoven rattan seat and back, our Willis chair offers a minimalist twist on a classic. Its wingback silhouette is paired with sleek black metal legs for bold look and a comfy seat.",
          "final_price": 192.99,
          "id": "78330",
          "image": "https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif",
          "link": "https://pacifichome.bloomreach.com/products/78330",
          "pid": "78330",
          "price": 296.91,
          "price_range": Array [
            296.91,
            296.91,
          ],
          "sale_price": 192.99,
          "sale_price_range": Array [
            161.99,
            161.99,
          ],
          "sizes": Array [],
          "sku_color_group": "Blue",
          "sku_swatch_images": Array [
            "10008031",
          ],
          "sku_thumb_images": Array [
            "https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif",
          ],
          "thumb_image": "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
          "title": "Black Rattan Willis Wingback Chair",
          "url": "https://pacifichome.bloomreach.com/products/78330",
          "variant_name": "Blue",
          "variants": Array [
            Object {
              "image": "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
              "sku_color_group": "Black",
              "sku_swatch_images": Array [
                "556689",
              ],
              "sku_thumb_images": Array [
                "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
              ],
              "variant_name": "Black",
            },
            Object {
              "image": "https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif",
              "sku_color_group": "Blue",
              "sku_swatch_images": Array [
                "10008031",
              ],
              "sku_thumb_images": Array [
                "https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif",
              ],
              "variant_name": "Blue",
            },
            Object {
              "image": "https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif",
              "sku_color_group": "Gray",
              "sku_swatch_images": Array [
                "526102",
              ],
              "sku_thumb_images": Array [
                "https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif",
              ],
              "variant_name": "Gray",
            },
          ],
        },
        Object {
          "brand": "",
          "description": "Featuring a handwoven rattan seat and back, our Willis chair offers a minimalist twist on a classic. Its wingback silhouette is paired with sleek black metal legs for bold look and a comfy seat.",
          "final_price": 192.99,
          "id": "78330",
          "image": "https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif",
          "link": "https://pacifichome.bloomreach.com/products/78330",
          "pid": "78330",
          "price": 296.91,
          "price_range": Array [
            296.91,
            296.91,
          ],
          "sale_price": 192.99,
          "sale_price_range": Array [
            161.99,
            161.99,
          ],
          "sizes": Array [],
          "sku_color_group": "Gray",
          "sku_swatch_images": Array [
            "526102",
          ],
          "sku_thumb_images": Array [
            "https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif",
          ],
          "thumb_image": "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
          "title": "Black Rattan Willis Wingback Chair",
          "url": "https://pacifichome.bloomreach.com/products/78330",
          "variant_name": "Gray",
          "variants": Array [
            Object {
              "image": "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
              "sku_color_group": "Black",
              "sku_swatch_images": Array [
                "556689",
              ],
              "sku_thumb_images": Array [
                "https://pacific-demo-data.bloomreach.cloud/home/images/78330_XXX_v1.tif",
              ],
              "variant_name": "Black",
            },
            Object {
              "image": "https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif",
              "sku_color_group": "Blue",
              "sku_swatch_images": Array [
                "10008031",
              ],
              "sku_thumb_images": Array [
                "https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif",
              ],
              "variant_name": "Blue",
            },
            Object {
              "image": "https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif",
              "sku_color_group": "Gray",
              "sku_swatch_images": Array [
                "526102",
              ],
              "sku_thumb_images": Array [
                "https://pacific-demo-data.bloomreach.cloud/home/images/60765_XXX_v1.tif",
              ],
              "variant_name": "Gray",
            },
          ],
        },
        Object {
          "brand": "",
          "description": "Boasting a curved, shapely silhouette, our Blue Linen Paige Round Back Dining Chairs define simple elegance. Crafted of white American oak, they feature a distressed finish that adds to their classic appeal.",
          "final_price": 425.96,
          "id": "35527",
          "image": "https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif",
          "link": "https://pacifichome.bloomreach.com/products/35527",
          "pid": "35527",
          "price": 655.32,
          "price_range": Array [
            655.32,
            655.32,
          ],
          "sale_price": 425.96,
          "sale_price_range": Array [
            275.98,
            275.98,
          ],
          "sizes": Array [],
          "thumb_image": "https://pacific-demo-data.bloomreach.cloud/home/images/35527_XXX_v1.tif",
          "title": "Blue Linen Paige Round Back Dining Chairs, Set of 2",
          "url": "https://pacifichome.bloomreach.com/products/35527",
          "variants": Array [],
        },
      ],
      "start": 0,
    }
  `)
})
