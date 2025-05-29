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
        {
          type: 'category',
          label: 'Zeenea & You',
          className: 'categoryItem',
          items: [
            'zeenea-documentation-feedback',
            'zeenea-roadmap',
            'zeenea-supported-browsers',
            'copyright',
          ]
        },
        {
          type: 'category',
          label: 'Get to Know Zeenea',
          className: 'categoryItem',
          items: [
            'zeenea-definitions',
            'zeenea-documentation-feedback',
            'zeenea-roadmap',
            'zeenea-supported-browsers',
          ]
        },
        {
          type: 'category',
          label: 'Your First Steps',
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
      label: 'FEATURES & APPLICATIONS',
      className: 'categoryItem',
      items: [
        {
          type: 'category',
          label: 'Zeenea Administration',
          className: 'categoryItem',
          items: [
            'zeenea-managing-users',
            'zeenea-managing-groups',
            'zeenea-managing-catalogs',
            'zeenea-managing-scanners',
            'zeenea-managing-connections',
            'zeenea-managing-api-keys',
            'zeenea-maintenance-mode',
          ]
        },
        {
          type: 'category',
          label: 'Zeenea Studio',
          className: 'categoryItem',
          items: [
            'zeenea-studio-overview',
            {
              type: 'category',
              label: 'Catalog Design',
              className: 'categoryItem',
              items: [
                'zeenea-configuring-templates',
                'zeenea-studio-create-delete-custom-item',
                'zeenea-studio-create-edit-delete-property',
                'zeenea-studio-create-delete-responsibility',
                'zeenea-studio-configure-glossary-model',
                'zeenea-add-input-output-types',
                'zeenea-custom-item-best-practices',
              ]
            },
            {
              type: 'category',
              label: 'Stewardship',
              className: 'categoryItem',
              items: [
                'zeenea-dashboard-widgets',
                'zeenea-studio-search',
                'zeenea-importing-datasets-or-visualizations',
                'zeenea-item-documentation',
                'zeenea-studio-create-delete-item',
                'zeenea-studio-create-delete-data-process',
                'zeenea-studio-create-edit-delete-topic',
                'zeenea-watchlist',
                'zeenea-editing-items-in-bulk',
                'zeenea-add-remove-item-contacts',
                'zeenea-curators',
                'zeenea-identification-keys',
                'zeenea-understanding-keys',
                'zeenea-doc-completion-level',
                'zeenea-studio-search-export',
                'zeenea-studio-import',
                'zeenea-identifying-orphan-datasets',
                'zeenea-personal-data',
                'zeenea-notifications',
                'zeenea-discussion-threads',
                'zeenea-data-catalog-item-updates',
              ]
            },
            'zeenea-analytics-dashboard',
          ]
        },
        {
          type: 'category',
          label: 'Zeenea Explorer',
          className: 'categoryItem',
          items: [
            'zeenea-explorer-overview',
            'zeenea-explorer-search',
            'zeenea-searching-topics',
            'zeenea-item-details-pages',
            'zeenea-submit-suggestion',
            'zeenea-explorer-export-search-results',
          ]
        },
        {
          type: 'category',
          label: 'Cross-Application Features',
          className: 'categoryItem',
          items: [
            'zeenea-data-lineage',
            'zeenea-data-sampling',
            'zeenea-data-profiling',
            'zeenea-glossary-hierarchy',
            'zeenea-view-360-diagram',
            'zeenea-access-requests',
            'zeenea-synchronization',
            'zeenea-query-language',
            'zeenea-microsoft-teams',
          ]
        },
        {
          type: 'category',
          label: 'Federated Catalog',
          className: 'categoryItem',
          items: [
            'zeenea-federated-catalog-intro',
            'zeenea-federated-catalog-building',
            'zeenea-searching-federated-catalog',
          ]
        },
      ]
    },
    {
      type: 'category',
      label: 'TECHNICAL DOCUMENTATION',
      className: 'categoryItem',
      items: [
      {
        type: 'category',
        label: 'Scanners',
        className: 'categoryItem',
        items: [
          'zeenea-scanner-setup',
          'zeenea-scanner-docker',
          'zeenea-filters',
          'zeenea-configure-hook',
          'zeenea-silwood-safyr',
          'zeenea-troubleshooting',
        ]
      },
      {
        type: 'category',
        label: 'Connectors',
        className: 'categoryItem',
        items: [
          'zeenea-dataset-detection',
          'zeenea-connectors-list',
          'zeenea-connectors-install-as-plugin',
          'zeenea-externalizing-external-connectors',
          'zeenea-connector-actian-dataconnect',
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
          'zeenea-connector-databricks-unity-rest',
          'zeenea-connector-databricks-unity-jdbc',
          'zeenea-connector-dataiku',
          'zeenea-connector-db2',
          'zeenea-connector-dbt',
          'zeenea-connector-dbt-cloud',
          'zeenea-connector-denodo',
          'zeenea-connector-dynamics365',
          'zeenea-connector-dynamics-ax',
          'zeenea-connector-elasticsearch',
          'zeenea-connector-generic-dataset',
          'zeenea-connector-generic-jdbc',
          `zeenea-connector-generic-lineage`,
          'zeenea-connector-google-bigquery',
          'zeenea-connector-google-cloud-storage',
          'zeenea-connector-google-data-catalog',
          'zeenea-connector-google-data-lineage',
          'zeenea-connector-google-dataplex',
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
          'zeenea-connector-matillion-dpc',
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
          'zeenea-connector-sap-safyr',
          'zeenea-connector-sap-analytics-cloud',
          'zeenea-connector-sap-bo',
          'zeenea-connector-sap-bw-safyr',
          'zeenea-connector-sas-data-integration',
          'zeenea-connector-sas-db',
          `zeenea-connector-snowflake`,
          'zeenea-connector-splunk',
          `zeenea-connector-sqlserver`,
          'zeenea-connector-ssas',
          'zeenea-connector-ssis',
          'zeenea-connector-ssrs',
          'zeenea-connector-sybase-iq',
          'zeenea-connector-tableau',
          'zeenea-connector-talend',
          'zeenea-connector-teradata',
          'zeenea-connector-tibco-data-virtualization',
          'zeenea-connector-tibco-spotfire',
          'zeenea-connector-zdf',
        ]
      },
      {
        type: 'category',
        label: 'Authentication',
        className: 'categoryItem',
        items: [
          'zeenea-auth0-integration',
        ]
      },
      {
        type: 'category',
        label: 'API',
        className: 'categoryItem',
        items: [
          'zeenea-public-apis',
          'zeenea-api-lifecycle',
          'zeenea-catalog-api-v1',
          'zeenea-catalog-api-v2',
          'zeenea-graphql-api-v2-limitations',
          'zeenea-catalog-design-api',
          'zeenea-audit-trail-apis',
          'zeenea-scim-api',
          'zeenea-user-management-api',
        ]
      },
      'zeenea-security-flaws-management',
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
