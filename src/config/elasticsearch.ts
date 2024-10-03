// import { Client } from "@elastic/elasticsearch";

import { Client } from "@elastic/elasticsearch-serverless";

const esClient = new Client({
    node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
    requestTimeout: 60000,
    auth: {
        apiKey: process.env.ELASTICSEARCH_API_KEY || ''
    }
});

export {esClient};