const parameters = require('../config/parameters');
const fetch = require('node-fetch');

const PollingService = (function serviceFactory(parameters) {

    /*
    * Generates a singleton service
    * */

    let serviceInstance = null;

    const PollingService = function UpdateService() {

        /*
        * Return instance if exists
        * */
        if (serviceInstance !== null) {
            return serviceInstance;
        }

        /*
        * Assign if not
        * */
        serviceInstance = this;

        /*
        * Parameters and constants
        * */
        serviceInstance.polling_timeout = parameters.polling_to_giraffe_timeout;

        const headers = {
            'Content-Type': 'application/json',
        };

        const polling_url = parameters.giraffe_url + '/messages';

        /*
        * Polling call
        * */
        const polling = function (process_data) {

            fetch(polling_url, { headers })
                .then(response => response.json())
                .then(data => {

                    const keep = process_data(data);

                    if (keep) {
                        return setTimeout( () => polling(process_data), serviceInstance.polling_timeout);
                    }
                });

            return serviceInstance;
        };

        /*
        * Proccess
        * */
        const process_data = function (data) {

            if ( !(data.errors) || data.errors.length > 1) {
                // error
                return true;
            }



            return true;
        };


        /*
        * Public methods
        * */
        serviceInstance.start = function () {
            polling(process_data);
            return serviceInstance;
        };


        /*
        * Return instance (this could be omitted)
        * */
        return serviceInstance;
    };


    /*
    * Return service class
    * */
    return PollingService;

})(parameters);

module.exports = PollingService;