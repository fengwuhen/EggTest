'use strict';

module.exports = {
    ERROR: function (data) {
        return {
            code: 1,
            msg: data || 'failed',
            data: []
        }
    },
    SUCCESS: function (data) {
        return {
            code: 0,
            msg: 'success',
            data: data
        }
    },
    ODD: function (error) {
        return {
            code: -1,
            msg: error,
            data: []
        }
    },
    LIST_ERROR: function (data) {
        return {
            code: 1,
            msg: data,
            data: {
                datas: [],
                total: 0,
                offset: 0,
                limit: 0,
                over: false
            }
        }
    },
    LIST_SUCCESS: function ({
        offset,
        limit,
        total,
        result
    }) {
        return {
            code: 0,
            msg: '',
            data: {
                datas: result,
                total: total,
                offset: offset,
                limit: limit,
                over: false
            }
        }
    },
    LIST_ODD: function (error) {
        return {
            code: -1,
            msg: error,
            data: {
                datas: [],
                total: 0,
                offset: 0,
                limit: 0,
                over: false
            }
        }
    }
};