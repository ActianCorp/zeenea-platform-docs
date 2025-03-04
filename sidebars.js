/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docSidebar: [
    'zeenea-intro',
    {
      type: 'category',
      label: 'GETTING STARTED',
      className: 'categoryItem',
      items: [
        'zeenea-concepts-and-definitions',
        'zeenea-supported-browsers',
        {
          type: 'category',
          label: 'YOUR FIRST STEPS',
          className: 'categoryItem',
          items: [
            'zeenea-superadmin',
            'zeenea-data-steward',
            'zeenea-data-explorer',
          ]
        },
      ]
    },
    {
      type: 'category',
      label: 'SCANNERS',
      className: 'categoryItem',
      items: [
        'zeenea-scanner-setup',
        'zeenea-scanner-docker',
        'zeenea-managing-scanners',
        'zeenea-troubleshooting',
      ]
    },
    {
      type: 'category',
      label: 'CONNECTORS',
      className: 'categoryItem',
      items: [
        'zeenea-connectors-list',
        'zeenea-connectors-install-as-plugin',
        'zeenea-externalizing-external-connectors',
        //'zeenea-dataconnect-connector',
        'zeenea-connector-actian-informix',
        'zeenea-connector-actian-ingres',
        'zeenea-connector-actian-zen',
        `zeenea-connector-agile-data-engine-solita`,
        'zeenea-connector-aliyun-dataworks-maxcompute',
        `zeenea-connector-amazonS3`,
        'zeenea-connector-atlas',
        `zeenea-connector-aws-athena`,
        'zeenea-connector-aws-dynamodb',
        'zeenea-connector-aws-glue-data-catalog',
        'zeenea-connector-aws-glue-etl',
        `zeenea-connector-aws-redshift`,
        `zeenea-connector-azure-data-factory`,
        `zeenea-connector-azure-data-lake`,
        'zeenea-connector-azure-purview',
        'zeenea-connector-azure-synapse',
        'zeenea-connector-cassandra',
        'zeenea-connector-couchbase',
        'zeenea-connector-custom-items-csv',
        'zeenea-connector-databricks-hive-metastore',
        'zeenea-connector-databricks-unity',
        'zeenea-connector-dataiku',
        'zeenea-connector-db2',
        'zeenea-connector-dbt',
        'zeenea-connector-dynamics365',
        'zeenea-connector-denodo',
        'zeenea-connector-elasticsearch',
        'zeenea-connector-generic-dataset',
        'zeenea-connector-generic-jdbc',
        `zeenea-connector-generic-lineage`,
        'zeenea-connector-google-bigquery',
        'zeenea-connector-google-cloud-storage',
        'zeenea-connector-google-data-catalog',
        'zeenea-connector-google-dataplex',
        'zeenea-connector-google-data-lineage',
        'zeenea-connector-greenplum',
        'zeenea-connector-hdfs',
        'zeenea-connector-hive',
        'zeenea-connector-impala',
        'zeenea-connector-influxdb',
        'zeenea-connector-informatica',
        'zeenea-connector-kafka',
        'zeenea-connector-local-filesystem',
        'zeenea-connector-looker',
        'zeenea-connector-mariadb',
        'zeenea-connector-matillion',
        'zeenea-connector-microstrategy',
        'zeenea-connector-mongodb',
        'zeenea-connector-mysql',
        'zeenea-connector-netezza',
        'zeenea-connector-openapi',
        'zeenea-connector-oracle',
        'zeenea-connector-oracle ebusiness-suite',
        'zeenea-connector-oracle-jd-edwards',
        'zeenea-connector-oracle-peoplesoft',
        'zeenea-connector-oracle-siebel',
        'zeenea-connector-palantir',
        'zeenea-connector-postgresql',
        'zeenea-connector-powerbi-report-server',
        'zeenea-connector-powerbi-saas',
        'zeenea-connector-qlik-cloud',
        'zeenea-connector-qlik-sense',
        'zeenea-connector-salesforce',
        'zeenea-connector-sap-analytics-cloud',
        'zeenea-connector-sap-bw-safyr',
        'zeenea-connector-sap-bo',
        'zeenea-connector-sap-safyr',
        'zeenea-connector-sas-data-integration',
        'zeenea-connector-sas-db',
        `zeenea-connector-snowflake`,
        'zeenea-connector-splunk',
        `zeenea-connector-sqlserver`,
        'zeenea-connector-ssis',
        'zeenea-connector-ssrs',
        'zeenea-connector-sybase-iq',
        'zeenea-connector-tableau',
        'zeenea-connector-talend',
        'zeenea-connector-teradata',
        'zeenea-connector-tibco-data-visualization',
        'zeenea-connector-tibco-spotfire',
        'zeenea-connector-zdf',
      ]
    },
    {
      type: 'category',
      label: 'ZEENEA STUDIO',
      className: 'categoryItem',
      items: [
        'zeenea-studio-overview',
        'zeenea-studio-import',
        'zeenea-studio-search-export',
        'zeenea-dashboard-widgets',
        'zeenea-doc-completion-level',
        'zeenea-studio-create-delete-item',
        'zeenea-studio-create-delete-custom-item',
        'zeenea-studio-create-delete-data-process',
        'zeenea-studio-create-delete-responsibility',
        'zeenea-studio-create-edit-delete-property',
        'zeenea-studio-create-edit-delete-topic',
        'zeenea-add-remove-item-contacts',
        'zeenea-editing-items-in-bulk',
        'zeenea-watchlist',
        'zeenea-impoting-datasets-or-visualizations',
        'zeenea-studio-configure-glossary-model',
        'zeenea-notifications',
        'zeenea-discussion-threads',
        'zeenea-identifying-orphan-datasets',
        'zeenea-add-input-output-types',
        'zeenea-item-documentation',
        'zeenea-analytics-dashboard',
      ]
    },
    {
      type: 'category',
      label: 'ZEENEA EXPLORER',
      className: 'categoryItem',
      items: [
        'zeenea-explorer-overview',
        'zeenea-explorer-search',
        'zeenea-explorer-export-search-results',
        'zeenea-searching-federated-catalog',
        'zeenea-searching-topics',
        'zeenea-data-lineage',
        'zeenea-data-sampling',
        'zeenea-data-profiling',
        'zeenea-data-model-diagram',
        'zeenea-data-catalog-item-updates',
        'zeenea-item-details-pages',
        'zeenea-view-360-diagram',
        'zeenea-submit-suggestion',
      ]
    },
    {
      type: 'category',
      label: 'ZEENEA ADMINISTRATION',
      className: 'categoryItem',
      items: [
        'zeenea-managing-users',
        'zeenea-user-profiles-and-permissions',
        'zeenea-managing-groups',
        'zeenea-managing-catalogs',
        'zeenea-maintenance-mode',
        'zeenea-access-requests',
        'zeenea-managing-connections',
        'zeenea-managing-api-keys',
        'zeenea-security-flaws-management',
      ]
    },
    {
      type: 'category',
      label: 'APIs',
      className: 'categoryItem',
      items: [
        'zeenea-public-apis',
        'zeenea-api-lifecycle',
        'zeenea-catalog-api-v2',
        'zeenea-catalog-design-api',
        'zeenea-audit-trail-apis',
        'zeenea-graphql-api-v2-limitations',
        'zeenea-scim-api',
        'zeenea-user-management-api',
      ]
    },
    {
      type: 'category',
      label: 'WHERE?',
      className: 'categoryItem',
      items: [
        'zeenea-filters',
        'zeenea-configure-hook',
        'zeenea-synchronization',
        'zeenea-federated-catalog-intro',
        'zeenea-federated-catalog-building',
        'zeenea-identification-keys',
        'zeenea-personal-data',
        'zeenea-dataset-detection',
        'zeenea-generating-har-file',
        'zeenea-synchronizing-users',
        'zeenea-roadmap',
        'zeenea-glossary-hierarchy',
        'zeenea-auth0-integration',
        'zeenea-microsoft-teams',
        'zeenea-understanding-keys',
        'zeenea-custom-item-best-practices',
        'zeenea-advanced-search',
        'zeenea-curators',
        'zeenea-adding-datasets-to-visualizations',
        'zeenea-silwood-safyr',
        'zeenea-tenant-management',
        'zeenea-query-language',
      ]
    },
  ],
};

module.exports = sidebars;

//module.exports = {
//  myAutogeneratedSidebar: [
//    {
//      type: 'autogenerated',
//      dirName: '.', // '.' means the current docs folder
//    },
//  ],
//};
