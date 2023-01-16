import * as core from '@actions/core';
import * as fs from 'fs';

// names of the input parameters
const INPUT_ASANA_API_KEY = 'asana-api-key';
const INPUT_ASANA_UDPATE_ID = 'asana-update-id';
const INPUT_ASANA_FILE_PATH = 'asana-file-path';
// name of the ouput parameter
const OUTPUT_ASANA_RESPONSE = 'asana-response';
// general constant
const ASANA_URL = 'https://app.asana.com/api/1.0/attachments'

async function run() {
    try {
        const asanaAPIKey = core.getInput(INPUT_ASANA_API_KEY);
        const asanaUpdateID = core.getInput(INPUT_ASANA_UDPATE_ID);
        let asanaFilePath = core.getInput(INPUT_ASANA_FILE_PATH);

        // check if the file doesn't exist in the file system
        // to skip the rest of the action, because the file is required for this action
        if (!fs.existsSync(asanaFilePath)) {
            core.setFailed("Received file doesn't exist.");
            return;
        }

        var request = require('request');
        // prepeare data for the asana.com request
        var options = {
          'method': 'POST',
          'url': ASANA_URL,
          'headers': {
            'Authorization': `Bearer ${asanaAPIKey}`
          },
          formData: {
               'file': fs.createReadStream(`${asanaFilePath}`),
               'name': `${asanaFilePath}`,
               'parent': `${INPUT_ASANA_UDPATE_ID}`
          }
        };
        // execute the request 
        request(options, function (error: any, response: any) { 
            if (error) throw new Error(error);
            // in case that the request is successfully executed
            // here the output value will be set for further actions
            core.setOutput(OUTPUT_ASANA_RESPONSE, response.body);
        });
    } catch(exception) {
        core.setFailed(exception as string);
    }
}

run();