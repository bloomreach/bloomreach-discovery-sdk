"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const utils_1 = require("ts-jest/utils");
const pathways_and_recommendations_1 = require("../pathways-and-recommendations");
jest.mock('../common', () => ({
    buildStaticWidgetConfigParameters: jest.fn()
}));
beforeEach(() => {
    jest.resetAllMocks();
});
test('it builds the correct Item widget config object', () => {
    const widgetId = 'pWb1zD';
    utils_1.mocked(common_1.buildStaticWidgetConfigParameters).mockReturnValue({
        endpoint: 'http://example.com/widget-endpoint',
        type: 'item',
        id: widgetId,
        numberOfItemsToShow: 4,
        urlParameters: {
            account_id: 'account id 123',
            domain_key: 'domain_key value',
            request_id: 123456789,
            _br_uid_2: '_br_uid_2 345',
            ref_url: 'http://example.com/full/url',
            url: 'http://example.com/full/url',
            rows: 16,
            start: 0,
            fields: 'a,b'
        }
    });
    const widgetConfig = pathways_and_recommendations_1.PathwaysAndRecommendationsConfigFactory.build({
        id: widgetId,
        type: 'item',
        itemIds: '55837',
        numberOfItemsToFetch: '16',
        numberOfItemsToShow: '4'
    });
    expect(common_1.buildStaticWidgetConfigParameters).toHaveBeenCalledTimes(1);
    expect(widgetConfig.getAll()).toMatchInlineSnapshot(`
    Object {
      "endpoint": "http://example.com/widget-endpoint",
      "id": "pWb1zD",
      "numberOfItemsToShow": 4,
      "type": "item",
      "urlParameters": Object {
        "_br_uid_2": "_br_uid_2 345",
        "account_id": "account id 123",
        "domain_key": "domain_key value",
        "fields": "a,b",
        "item_ids": "55837",
        "ref_url": "http://example.com/full/url",
        "request_id": 123456789,
        "rows": "16",
        "start": 0,
        "url": "http://example.com/full/url",
      },
    }
  `);
});
test('it builds the correct Category widget config object', () => {
    const widgetId = 'pWb1zD';
    utils_1.mocked(common_1.buildStaticWidgetConfigParameters).mockReturnValue({
        endpoint: 'http://example.com/widget-endpoint',
        type: 'category',
        id: widgetId,
        numberOfItemsToShow: 4,
        urlParameters: {
            account_id: 'account id 123',
            domain_key: 'domain_key value',
            request_id: 123456789,
            _br_uid_2: '_br_uid_2 345',
            ref_url: 'http://example.com/full/url',
            url: 'http://example.com/full/url',
            rows: 16,
            start: 0,
            fields: 'a,b'
        }
    });
    const widgetConfig = pathways_and_recommendations_1.PathwaysAndRecommendationsConfigFactory.build({
        id: widgetId,
        type: 'category',
        categoryId: '116940',
        numberOfItemsToFetch: '16',
        numberOfItemsToShow: '4'
    });
    expect(common_1.buildStaticWidgetConfigParameters).toHaveBeenCalledTimes(1);
    expect(widgetConfig.getAll()).toMatchInlineSnapshot(`
    Object {
      "endpoint": "http://example.com/widget-endpoint",
      "id": "pWb1zD",
      "numberOfItemsToShow": 4,
      "type": "category",
      "urlParameters": Object {
        "_br_uid_2": "_br_uid_2 345",
        "account_id": "account id 123",
        "cat_id": "116940",
        "domain_key": "domain_key value",
        "fields": "a,b",
        "ref_url": "http://example.com/full/url",
        "request_id": 123456789,
        "rows": "16",
        "start": 0,
        "url": "http://example.com/full/url",
      },
    }
  `);
});
test('it builds the correct Keyword widget config object', () => {
    const widgetId = 'pWb1zD';
    utils_1.mocked(common_1.buildStaticWidgetConfigParameters).mockReturnValue({
        endpoint: 'http://example.com/widget-endpoint',
        type: 'keyword',
        id: widgetId,
        numberOfItemsToShow: 4,
        urlParameters: {
            account_id: 'account id 123',
            domain_key: 'domain_key value',
            request_id: 123456789,
            _br_uid_2: '_br_uid_2 345',
            ref_url: 'http://example.com/full/url',
            url: 'http://example.com/full/url',
            rows: 16,
            start: 0,
            fields: 'a,b'
        }
    });
    const widgetConfig = pathways_and_recommendations_1.PathwaysAndRecommendationsConfigFactory.build({
        id: widgetId,
        type: 'keyword',
        query: 'bath and bed',
        numberOfItemsToFetch: '16',
        numberOfItemsToShow: '4'
    });
    expect(common_1.buildStaticWidgetConfigParameters).toHaveBeenCalledTimes(1);
    expect(widgetConfig.getAll()).toMatchInlineSnapshot(`
    Object {
      "endpoint": "http://example.com/widget-endpoint",
      "id": "pWb1zD",
      "numberOfItemsToShow": 4,
      "type": "keyword",
      "urlParameters": Object {
        "_br_uid_2": "_br_uid_2 345",
        "account_id": "account id 123",
        "domain_key": "domain_key value",
        "fields": "a,b",
        "query": "bath and bed",
        "ref_url": "http://example.com/full/url",
        "request_id": 123456789,
        "rows": "16",
        "start": 0,
        "url": "http://example.com/full/url",
      },
    }
  `);
});
test('it builds the correct Personalized widget config object', () => {
    const widgetId = 'pWb1zD';
    utils_1.mocked(common_1.buildStaticWidgetConfigParameters).mockReturnValue({
        endpoint: 'http://example.com/widget-endpoint',
        type: 'personalized',
        id: widgetId,
        numberOfItemsToShow: 4,
        urlParameters: {
            account_id: 'account id 123',
            domain_key: 'domain_key value',
            request_id: 123456789,
            _br_uid_2: '_br_uid_2 345',
            ref_url: 'http://example.com/full/url',
            url: 'http://example.com/full/url',
            rows: 16,
            start: 0,
            fields: 'a,b'
        }
    });
    const widgetConfig = pathways_and_recommendations_1.PathwaysAndRecommendationsConfigFactory.build({
        id: widgetId,
        type: 'personalized',
        userId: '55837',
        numberOfItemsToFetch: '16',
        numberOfItemsToShow: '4'
    });
    expect(common_1.buildStaticWidgetConfigParameters).toHaveBeenCalledTimes(1);
    expect(widgetConfig.getAll()).toMatchInlineSnapshot(`
    Object {
      "endpoint": "http://example.com/widget-endpoint",
      "id": "pWb1zD",
      "numberOfItemsToShow": 4,
      "type": "personalized",
      "urlParameters": Object {
        "_br_uid_2": "_br_uid_2 345",
        "account_id": "account id 123",
        "domain_key": "domain_key value",
        "fields": "a,b",
        "ref_url": "http://example.com/full/url",
        "request_id": 123456789,
        "rows": "16",
        "start": 0,
        "url": "http://example.com/full/url",
        "user_id": "55837",
      },
    }
  `);
});
test('it builds the correct Global widget config object', () => {
    const widgetId = 'pWb1zD';
    utils_1.mocked(common_1.buildStaticWidgetConfigParameters).mockReturnValue({
        endpoint: 'http://example.com/widget-endpoint',
        type: 'global',
        id: widgetId,
        numberOfItemsToShow: 4,
        urlParameters: {
            account_id: 'account id 123',
            domain_key: 'domain_key value',
            request_id: 123456789,
            _br_uid_2: '_br_uid_2 345',
            ref_url: 'http://example.com/full/url',
            url: 'http://example.com/full/url',
            rows: 16,
            start: 0,
            fields: 'a,b'
        }
    });
    const widgetConfig = pathways_and_recommendations_1.PathwaysAndRecommendationsConfigFactory.build({
        id: widgetId,
        type: 'global',
        numberOfItemsToFetch: '16',
        numberOfItemsToShow: '4'
    });
    expect(common_1.buildStaticWidgetConfigParameters).toHaveBeenCalledTimes(1);
    expect(widgetConfig.getAll()).toMatchInlineSnapshot(`
    Object {
      "endpoint": "http://example.com/widget-endpoint",
      "id": "pWb1zD",
      "numberOfItemsToShow": 4,
      "type": "global",
      "urlParameters": Object {
        "_br_uid_2": "_br_uid_2 345",
        "account_id": "account id 123",
        "domain_key": "domain_key value",
        "fields": "a,b",
        "ref_url": "http://example.com/full/url",
        "request_id": 123456789,
        "rows": "16",
        "start": 0,
        "url": "http://example.com/full/url",
      },
    }
  `);
});
