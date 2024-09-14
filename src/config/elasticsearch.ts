import { Client } from "@elastic/elasticsearch";

const esClient = new Client({
    node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
    requestTimeout: 60000,
});

export {esClient};