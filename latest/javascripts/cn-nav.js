(function () {

  var SECTIONS = [
    {
      key: '',
      label: 'Home',
      href: 'index.html',
      pages: []
    },
    {
      key: 'getting-started',
      label: 'Getting Started',
      href: 'getting-started/zeenea-supported-browsers.html',
      pages: [
        {
          name: 'Supported Browsers',
          href: 'getting-started/zeenea-supported-browsers.html'
        },
        {
          name: 'Copyright Information',
          href: 'getting-started/copyright.html'
        },
        {
          name: 'Definitions',
          href: 'getting-started/zeenea-definitions.html'
        },
        {
          name: 'Your First Steps',
          href: 'getting-started/your-first-step/zeenea-superadmin.html',
          pages: [
            {
              name: 'As a Super Admin',
              href: 'getting-started/your-first-step/zeenea-superadmin.html'
            },
            {
              name: 'As a Data Steward',
              href: 'getting-started/your-first-step/zeenea-data-steward.html'
            },
            {
              name: 'As a Data Explorer',
              href: 'getting-started/your-first-step/zeenea-data-explorer.html'
            }
          ]
        }
      ]
    },
    {
      key: 'features-applications',
      label: 'Features & Applications',
      href: 'features-applications/administration/zeenea-managing-users.html',
      pages: [
        {
          name: 'Administration',
          href: 'features-applications/administration/zeenea-managing-users.html',
          pages: [
            {
              name: 'Managing Users',
              href: 'features-applications/administration/zeenea-managing-users.html'
            },
            {
              name: 'Managing Groups',
              href: 'features-applications/administration/zeenea-managing-groups.html'
            },
            {
              name: 'Managing Agents',
              href: 'features-applications/administration/zeenea-managing-agents.html'
            },
            {
              name: 'Managing Catalogs',
              href: 'features-applications/administration/zeenea-managing-catalogs.html'
            },
            {
              name: 'Managing Scanners',
              href: 'features-applications/administration/zeenea-managing-scanners.html'
            },
            {
              name: 'Managing Connections',
              href: 'features-applications/administration/zeenea-managing-connections.html'
            },
            {
              name: 'Managing API Keys',
              href: 'features-applications/administration/zeenea-managing-api-keys.html'
            },
            {
              name: 'Maintenance Mode',
              href: 'features-applications/administration/zeenea-maintenance-mode.html'
            }
          ]
        },
        {
          name: 'Studio',
          href: 'features-applications/studio/zeenea-studio-overview.html',
          pages: [
            {
              name: 'Zeenea Studio Overview',
              href: 'features-applications/studio/zeenea-studio-overview.html'
            },
            {
              name: 'Catalog Design',
              href: 'features-applications/studio/catalog-design/zeenea-configuring-templates.html',
              pages: [
                {
                  name: 'Configuring Templates',
                  href: 'features-applications/studio/catalog-design/zeenea-configuring-templates.html'
                },
                {
                  name: 'Creating or Deleting a Custom Item Type',
                  href: 'features-applications/studio/catalog-design/zeenea-studio-create-delete-custom-item.html'
                },
                {
                  name: 'Creating, Editing, or Deleting a Property',
                  href: 'features-applications/studio/catalog-design/zeenea-studio-create-edit-delete-property.html'
                },
                {
                  name: 'Creating, Editing, or Deleting Responsibilities',
                  href: 'features-applications/studio/catalog-design/zeenea-studio-create-delete-responsibility.html'
                },
                {
                  name: 'Configuring the Glossary Metamodel',
                  href: 'features-applications/studio/catalog-design/zeenea-studio-configure-glossary-model.html'
                },
                {
                  name: 'Adding Input and Output Types to Data Processes',
                  href: 'features-applications/studio/catalog-design/zeenea-add-input-output-types.html'
                },
                {
                  name: 'Custom Items - Best Practices',
                  href: 'features-applications/studio/catalog-design/zeenea-custom-item-best-practices.html'
                }
              ]
            },
            {
              name: 'Stewardship',
              href: 'features-applications/studio/stewardship/data-steward.html',
              pages: [
                {
                  name: 'Data Steward Agent',
                  href: 'features-applications/studio/stewardship/data-steward.html'
                },
                {
                  name: 'Dashboard Widgets',
                  href: 'features-applications/studio/stewardship/zeenea-dashboard-widgets.html'
                },
                {
                  name: 'Searching and Filtering in Zeenea Studio',
                  href: 'features-applications/studio/stewardship/zeenea-studio-search.html'
                },
                {
                  name: 'Importing Datasets or Visualizations',
                  href: 'features-applications/studio/stewardship/zeenea-importing-datasets-or-visualizations.html'
                },
                {
                  name: 'Understanding the Documentation of an Item',
                  href: 'features-applications/studio/stewardship/zeenea-item-documentation.html'
                },
                {
                  name: 'Creating or Deleting an Item',
                  href: 'features-applications/studio/stewardship/zeenea-studio-create-delete-item.html'
                },
                {
                  name: 'Creating, Editing, or Deleting a Data Process',
                  href: 'features-applications/studio/stewardship/zeenea-studio-create-delete-data-process.html'
                },
                {
                  name: 'Creating, Editing, or Deleting a Topic',
                  href: 'features-applications/studio/stewardship/zeenea-studio-create-edit-delete-topic.html'
                },
                {
                  name: 'Creating or Deleting a Watchlist',
                  href: 'features-applications/studio/stewardship/zeenea-watchlist.html'
                },
                {
                  name: 'Editing Items in Bulk',
                  href: 'features-applications/studio/stewardship/zeenea-editing-items-in-bulk.html'
                },
                {
                  name: 'Adding or Removing Item Contacts',
                  href: 'features-applications/studio/stewardship/zeenea-add-remove-item-contacts.html'
                },
                {
                  name: 'Assigning and Removing Curators',
                  href: 'features-applications/studio/stewardship/zeenea-curators.html'
                },
                {
                  name: 'Identification Keys',
                  href: 'features-applications/studio/stewardship/zeenea-identification-keys.html'
                },
                {
                  name: 'Primary Keys, Foreign keys, and Business Keys',
                  href: 'features-applications/studio/stewardship/zeenea-understanding-keys.html'
                },
                {
                  name: 'Documentation Completion Level',
                  href: 'features-applications/studio/stewardship/zeenea-doc-completion-level.html'
                },
                {
                  name: 'Exporting Search Results in Zeenea Studio',
                  href: 'features-applications/studio/stewardship/zeenea-studio-search-export.html'
                },
                {
                  name: 'Importing a File in Zeenea',
                  href: 'features-applications/studio/stewardship/zeenea-studio-import.html'
                },
                {
                  name: 'Identifying Orphan Datasets',
                  href: 'features-applications/studio/stewardship/zeenea-identifying-orphan-datasets.html'
                },
                {
                  name: 'Personally Identifiable Information Property',
                  href: 'features-applications/studio/stewardship/zeenea-personal-data.html'
                },
                {
                  name: 'How Notifications Work',
                  href: 'features-applications/studio/stewardship/zeenea-notifications.html'
                },
                {
                  name: 'How Discussion Threads Work',
                  href: 'features-applications/studio/stewardship/zeenea-discussion-threads.html'
                },
                {
                  name: 'Data Catalog Item Updates',
                  href: 'features-applications/studio/stewardship/zeenea-data-catalog-item-updates.html'
                }
              ]
            },
            {
              name: 'Analytics Dashboard',
              href: 'features-applications/studio/zeenea-analytics-dashboard.html'
            }
          ]
        },
        {
          name: 'Explorer',
          href: 'features-applications/explorer/zeenea-explorer-overview.html',
          pages: [
            {
              name: 'Zeenea Explorer Overview',
              href: 'features-applications/explorer/zeenea-explorer-overview.html'
            },
            {
              name: 'Search and Filter in Zeenea Explorer',
              href: 'features-applications/explorer/zeenea-explorer-search.html'
            },
            {
              name: 'Searching and Exploring Topics',
              href: 'features-applications/explorer/zeenea-searching-topics.html'
            },
            {
              name: 'Ask AI',
              href: 'features-applications/explorer/zeenea-ask-ai.html'
            },
            {
              name: 'Item Details Page',
              href: 'features-applications/explorer/zeenea-item-details-pages.html'
            },
            {
              name: 'Favorite Items',
              href: 'features-applications/explorer/zeenea-favorite-items.html'
            },
            {
              name: 'Submitting a Suggestion',
              href: 'features-applications/explorer/zeenea-submit-suggestion.html'
            },
            {
              name: 'Exporting Search Results from Zeenea Explorer',
              href: 'features-applications/explorer/zeenea-explorer-export-search-results.html'
            }
          ]
        },
        {
          name: 'Cross-Application Features',
          href: 'features-applications/cross-application-features/zeenea-data-product.html',
          pages: [
            {
              name: 'Data Products',
              href: 'features-applications/cross-application-features/zeenea-data-product.html'
            },
            {
              name: 'Data Lineage',
              href: 'features-applications/cross-application-features/zeenea-data-lineage.html'
            },
            {
              name: 'Data Sampling',
              href: 'features-applications/cross-application-features/zeenea-data-sampling.html'
            },
            {
              name: 'Data Profiling',
              href: 'features-applications/cross-application-features/zeenea-data-profiling.html'
            },
            {
              name: 'Glossary Item Hierarchy',
              href: 'features-applications/cross-application-features/zeenea-glossary-hierarchy.html'
            },
            {
              name: 'View 360 Diagram',
              href: 'features-applications/cross-application-features/zeenea-view-360-diagram.html'
            },
            {
              name: 'Access Requests',
              href: 'features-applications/cross-application-features/zeenea-access-requests.html'
            },
            {
              name: 'Synchronization with a Data Quality Management Tool',
              href: 'features-applications/cross-application-features/zeenea-synchronization.html'
            },
            {
              name: 'Zeenea Query Language',
              href: 'features-applications/cross-application-features/zeenea-query-language.html'
            },
            {
              name: 'Integration with Microsoft Teams',
              href: 'features-applications/cross-application-features/zeenea-microsoft-teams.html'
            }
          ]
        },
        {
          name: 'Actian Chrome Extension',
          href: 'features-applications/data-intelligence-chrome-extension.html'
        },
        {
          name: 'Actian MCP Server',
          href: 'features-applications/actian-mcp-server/zeenea-amcp-overview.html',
          pages: [
            {
              name: 'Amcp Overview',
              href: 'features-applications/actian-mcp-server/zeenea-amcp-overview.html'
            },
            {
              name: 'Remote Authentication Setup',
              href: 'features-applications/actian-mcp-server/zeenea-amcp-remote-authentication.html'
            },
            {
              name: 'Set up Claude Desktop',
              href: 'features-applications/actian-mcp-server/zeenea-amcp-claude.html'
            }
          ]
        },
        {
          name: 'Federated Catalog',
          href: 'features-applications/federated-catalog/zeenea-federated-catalog-intro.html',
          pages: [
            {
              name: 'Federated Catalog Overview',
              href: 'features-applications/federated-catalog/zeenea-federated-catalog-intro.html'
            },
            {
              name: 'Building a Federated Catalog',
              href: 'features-applications/federated-catalog/zeenea-federated-catalog-building.html'
            },
            {
              name: 'Searching in the Federated Catalog',
              href: 'features-applications/federated-catalog/zeenea-searching-federated-catalog.html'
            }
          ]
        }
      ]
    },
    {
      key: 'technical-documentation',
      label: 'Technical Documentation',
      href: 'technical-documentation/scanners/zeenea-scanner-setup.html',
      pages: [
        {
          name: 'Scanners',
          href: 'technical-documentation/scanners/zeenea-scanner-setup.html',
          pages: [
            {
              name: 'Zeenea Scanner Setup',
              href: 'technical-documentation/scanners/zeenea-scanner-setup.html'
            },
            {
              name: 'Creating a Docker Image for your Scanner',
              href: 'technical-documentation/scanners/zeenea-scanner-docker.html'
            },
            {
              name: 'Filters',
              href: 'technical-documentation/scanners/zeenea-filters.html'
            },
            {
              name: 'Universal Filters',
              href: 'technical-documentation/scanners/zeenea-universal-filters.html'
            },
            {
              name: 'Configuring a Hook after a Scanner Job',
              href: 'technical-documentation/scanners/zeenea-configure-hook.html'
            },
            {
              name: 'Silwood Safyr',
              href: 'technical-documentation/scanners/zeenea-silwood-safyr.html'
            },
            {
              name: 'Troubleshooting Scanners and Connections',
              href: 'technical-documentation/scanners/zeenea-troubleshooting.html'
            }
          ]
        },
        {
          name: 'Connectors',
          href: 'technical-documentation/connectors/zeenea-dataset-detection.html',
          pages: [
            {
              name: 'Dataset Detection on File Systems',
              href: 'technical-documentation/connectors/zeenea-dataset-detection.html'
            },
            {
              name: 'Connector Downloads',
              href: 'technical-documentation/connectors/zeenea-connectors-list.html'
            },
            {
              name: 'Installing and Configuring Connectors as a Plugin',
              href: 'technical-documentation/connectors/zeenea-connectors-install-as-plugin.html'
            },
            {
              name: 'Externalizing Embedded Connectors',
              href: 'technical-documentation/connectors/zeenea-externalizing-external-connectors.html'
            },
            {
              name: 'Actian DataConnect',
              href: 'technical-documentation/connectors/zeenea-connector-actian-dataconnect.html'
            },
            {
              name: 'Actian Informix',
              href: 'technical-documentation/connectors/zeenea-connector-actian-informix.html'
            },
            {
              name: 'Actian Ingres',
              href: 'technical-documentation/connectors/zeenea-connector-actian-ingres.html'
            },
            {
              name: 'Actian Zen',
              href: 'technical-documentation/connectors/zeenea-connector-actian-zen.html'
            },
            {
              name: 'Agile Data Engine (Solita)',
              href: 'technical-documentation/connectors/zeenea-connector-agile-data-engine-solita.html'
            },
            {
              name: 'Aliyun DataWorks MaxCompute',
              href: 'technical-documentation/connectors/zeenea-connector-aliyun-dataworks-maxcompute.html'
            },
            {
              name: 'Amazon S3',
              href: 'technical-documentation/connectors/zeenea-connector-amazonS3.html'
            },
            {
              name: 'Atlas',
              href: 'technical-documentation/connectors/zeenea-connector-atlas.html'
            },
            {
              name: 'AWS Athena',
              href: 'technical-documentation/connectors/zeenea-connector-aws-athena.html'
            },
            {
              name: 'AWS DynamoDB',
              href: 'technical-documentation/connectors/zeenea-connector-aws-dynamodb.html'
            },
            {
              name: 'AWS Glue (Data Catalog)',
              href: 'technical-documentation/connectors/zeenea-connector-aws-glue-data-catalog.html'
            },
            {
              name: 'AWS Glue (ETL)',
              href: 'technical-documentation/connectors/zeenea-connector-aws-glue-etl.html'
            },
            {
              name: 'AWS Redshift',
              href: 'technical-documentation/connectors/zeenea-connector-aws-redshift.html'
            },
            {
              name: 'Azure Data Factory',
              href: 'technical-documentation/connectors/zeenea-connector-azure-data-factory.html'
            },
            {
              name: 'Azure Data Lake',
              href: 'technical-documentation/connectors/zeenea-connector-azure-data-lake.html'
            },
            {
              name: 'Azure Purview',
              href: 'technical-documentation/connectors/zeenea-connector-azure-purview.html'
            },
            {
              name: 'Azure Synapse Analytics',
              href: 'technical-documentation/connectors/zeenea-connector-azure-synapse.html'
            },
            {
              name: 'Cassandra',
              href: 'technical-documentation/connectors/zeenea-connector-cassandra.html'
            },
            {
              name: 'Couchbase',
              href: 'technical-documentation/connectors/zeenea-connector-couchbase.html'
            },
            {
              name: 'Custom Item - CSV (Deprecated)',
              href: 'technical-documentation/connectors/zeenea-connector-custom-items-csv.html'
            },
            {
              name: 'Databricks Hive Metastore',
              href: 'technical-documentation/connectors/zeenea-connector-databricks-hive-metastore.html'
            },
            {
              name: 'Databricks Unity Catalog JDBC',
              href: 'technical-documentation/connectors/zeenea-connector-databricks-unity-jdbc.html'
            },
            {
              name: 'Databricks Unity Catalog REST',
              href: 'technical-documentation/connectors/zeenea-connector-databricks-unity-rest.html'
            },
            {
              name: 'Dataiku',
              href: 'technical-documentation/connectors/zeenea-connector-dataiku.html'
            },
            {
              name: 'DB2',
              href: 'technical-documentation/connectors/zeenea-connector-db2.html'
            },
            {
              name: 'DBT',
              href: 'technical-documentation/connectors/zeenea-connector-dbt.html'
            },
            {
              name: 'DBT Cloud',
              href: 'technical-documentation/connectors/zeenea-connector-dbt-cloud.html'
            },
            {
              name: 'Denodo',
              href: 'technical-documentation/connectors/zeenea-connector-denodo.html'
            },
            {
              name: 'Dynamics AX',
              href: 'technical-documentation/connectors/zeenea-connector-dynamics-ax.html'
            },
            {
              name: 'Dynamics 365 (Safyr)',
              href: 'technical-documentation/connectors/zeenea-connector-dynamics365.html'
            },
            {
              name: 'Elasticsearch',
              href: 'technical-documentation/connectors/zeenea-connector-elasticsearch.html'
            },
            {
              name: 'Generic Dataset (Deprecated)',
              href: 'technical-documentation/connectors/zeenea-connector-generic-dataset.html'
            },
            {
              name: 'Generic JDBC',
              href: 'technical-documentation/connectors/zeenea-connector-generic-jdbc.html'
            },
            {
              name: 'Generic Lineage',
              href: 'technical-documentation/connectors/zeenea-connector-generic-lineage.html'
            },
            {
              name: 'Google BigQuery',
              href: 'technical-documentation/connectors/zeenea-connector-google-bigquery.html'
            },
            {
              name: 'Google Cloud Storage',
              href: 'technical-documentation/connectors/zeenea-connector-google-cloud-storage.html'
            },
            {
              name: 'Google Data Catalog',
              href: 'technical-documentation/connectors/zeenea-connector-google-data-catalog.html'
            },
            {
              name: 'Google Data Lineage',
              href: 'technical-documentation/connectors/zeenea-connector-google-data-lineage.html'
            },
            {
              name: 'Google Dataplex',
              href: 'technical-documentation/connectors/zeenea-connector-google-dataplex.html'
            },
            {
              name: 'Google Dataplex (V2)',
              href: 'technical-documentation/connectors/zeenea-connector-google-dataplex-v2.html'
            },
            {
              name: 'Greenplum',
              href: 'technical-documentation/connectors/zeenea-connector-greenplum.html'
            },
            {
              name: 'HDFS',
              href: 'technical-documentation/connectors/zeenea-connector-hdfs.html'
            },
            {
              name: 'Hive',
              href: 'technical-documentation/connectors/zeenea-connector-hive.html'
            },
            {
              name: 'Impala',
              href: 'technical-documentation/connectors/zeenea-connector-impala.html'
            },
            {
              name: 'InfluxDB',
              href: 'technical-documentation/connectors/zeenea-connector-influxdb.html'
            },
            {
              name: 'Informatica Data Integration',
              href: 'technical-documentation/connectors/zeenea-connector-informatica.html'
            },
            {
              name: 'Kafka',
              href: 'technical-documentation/connectors/zeenea-connector-kafka.html'
            },
            {
              name: 'Local File System',
              href: 'technical-documentation/connectors/zeenea-connector-local-filesystem.html'
            },
            {
              name: 'Looker',
              href: 'technical-documentation/connectors/zeenea-connector-looker.html'
            },
            {
              name: 'MariaDB',
              href: 'technical-documentation/connectors/zeenea-connector-mariadb.html'
            },
            {
              name: 'Matillion',
              href: 'technical-documentation/connectors/zeenea-connector-matillion.html'
            },
            {
              name: 'Matillion DPC',
              href: 'technical-documentation/connectors/zeenea-connector-matillion-dpc.html'
            },
            {
              name: 'Microsoft Fabric',
              href: 'technical-documentation/connectors/zeenea-connector-ms-fabric.html'
            },
            {
              name: 'MicroStrategy',
              href: 'technical-documentation/connectors/zeenea-connector-microstrategy.html'
            },
            {
              name: 'MongoDB',
              href: 'technical-documentation/connectors/zeenea-connector-mongodb.html'
            },
            {
              name: 'MySQL',
              href: 'technical-documentation/connectors/zeenea-connector-mysql.html'
            },
            {
              name: 'Netezza',
              href: 'technical-documentation/connectors/zeenea-connector-netezza.html'
            },
            {
              name: 'OpenAPI',
              href: 'technical-documentation/connectors/zeenea-connector-openapi.html'
            },
            {
              name: 'Oracle',
              href: 'technical-documentation/connectors/zeenea-connector-oracle.html'
            },
            {
              name: 'Oracle E-Business Suite (Safyr)',
              href: 'technical-documentation/connectors/zeenea-connector-oracle-ebusiness-suite.html'
            },
            {
              name: 'Oracle JD Edwards (Safyr)',
              href: 'technical-documentation/connectors/zeenea-connector-oracle-jd-edwards.html'
            },
            {
              name: 'Oracle PeopleSoft (Safyr)',
              href: 'technical-documentation/connectors/zeenea-connector-oracle-peoplesoft.html'
            },
            {
              name: 'Oracle Siebel (Safyr)',
              href: 'technical-documentation/connectors/zeenea-connector-oracle-siebel.html'
            },
            {
              name: 'Palantir Foundry',
              href: 'technical-documentation/connectors/zeenea-connector-palantir.html'
            },
            {
              name: 'PostgreSQL',
              href: 'technical-documentation/connectors/zeenea-connector-postgresql.html'
            },
            {
              name: 'Power BI Report Server',
              href: 'technical-documentation/connectors/zeenea-connector-powerbi-report-server.html'
            },
            {
              name: 'Power BI Online (Deprecated)',
              href: 'technical-documentation/connectors/zeenea-connector-powerbi-saas.html'
            },
            {
              name: 'Power BI Online (V2)',
              href: 'technical-documentation/connectors/zeenea-connector-powerbi-saas-v2.html'
            },
            {
              name: 'Qlik Cloud',
              href: 'technical-documentation/connectors/zeenea-connector-qlik-cloud.html'
            },
            {
              name: 'Qlik Sense',
              href: 'technical-documentation/connectors/zeenea-connector-qlik-sense.html'
            },
            {
              name: 'Salesforce',
              href: 'technical-documentation/connectors/zeenea-connector-salesforce2.html'
            },
            {
              name: 'Salesforce (Safyr)',
              href: 'technical-documentation/connectors/zeenea-connector-salesforce.html'
            },
            {
              name: 'SAP Analytics Cloud',
              href: 'technical-documentation/connectors/zeenea-connector-sap-analytics-cloud.html'
            },
            {
              name: 'SAP BO',
              href: 'technical-documentation/connectors/zeenea-connector-sap-bo.html'
            },
            {
              name: 'SAP BW (Safyr)',
              href: 'technical-documentation/connectors/zeenea-connector-sap-bw-safyr.html'
            },
            {
              name: 'SAP BW (Bluetelligence)',
              href: 'technical-documentation/connectors/zeenea-connector-sap-bw-bluetelligence.html'
            },
            {
              name: 'SAP (Safyr)',
              href: 'technical-documentation/connectors/zeenea-connector-sap-safyr.html'
            },
            {
              name: 'SAS Data Integration',
              href: 'technical-documentation/connectors/zeenea-connector-sas-data-integration.html'
            },
            {
              name: 'SAS Database',
              href: 'technical-documentation/connectors/zeenea-connector-sas-db.html'
            },
            {
              name: 'Snowflake',
              href: 'technical-documentation/connectors/zeenea-connector-snowflake.html'
            },
            {
              name: 'Splunk',
              href: 'technical-documentation/connectors/zeenea-connector-splunk.html'
            },
            {
              name: 'SQL Server',
              href: 'technical-documentation/connectors/zeenea-connector-sqlserver.html'
            },
            {
              name: 'SSAS',
              href: 'technical-documentation/connectors/zeenea-connector-ssas.html'
            },
            {
              name: 'SSIS',
              href: 'technical-documentation/connectors/zeenea-connector-ssis.html'
            },
            {
              name: 'SSRS',
              href: 'technical-documentation/connectors/zeenea-connector-ssrs.html'
            },
            {
              name: 'Sybase IQ',
              href: 'technical-documentation/connectors/zeenea-connector-sybase-iq.html'
            },
            {
              name: 'Tableau (Deprecated)',
              href: 'technical-documentation/connectors/zeenea-connector-tableau.html'
            },
            {
              name: 'Tableau (V2)',
              href: 'technical-documentation/connectors/zeenea-connector-tableau-v2.html'
            },
            {
              name: 'Talend',
              href: 'technical-documentation/connectors/zeenea-connector-talend.html'
            },
            {
              name: 'Teradata',
              href: 'technical-documentation/connectors/zeenea-connector-teradata.html'
            },
            {
              name: 'Tibco Data Virtualization',
              href: 'technical-documentation/connectors/zeenea-connector-tibco-data-virtualization.html'
            },
            {
              name: 'Tibco Spotfire (Deprecated)',
              href: 'technical-documentation/connectors/zeenea-connector-tibco-spotfire.html'
            },
            {
              name: 'Tibco Spotfire (V2)',
              href: 'technical-documentation/connectors/zeenea-connector-tibco-spotfire-v2.html'
            },
            {
              name: 'Zeenea Descriptor Format (ZDF)',
              href: 'technical-documentation/connectors/zeenea-connector-zdf.html'
            }
          ]
        },
        {
          name: 'Authentication',
          href: 'technical-documentation/authentication/zeenea-auth0-integration.html',
          pages: [
            {
              name: 'Integration with Auth0',
              href: 'technical-documentation/authentication/zeenea-auth0-integration.html'
            }
          ]
        },
        {
          name: 'API',
          href: 'technical-documentation/api/zeenea-public-apis.html',
          pages: [
            {
              name: 'Introduction to Zeenea Public APIs',
              href: 'technical-documentation/api/zeenea-public-apis.html'
            },
            {
              name: 'Zeenea API Lifecycle',
              href: 'technical-documentation/api/zeenea-api-lifecycle.html'
            },
            {
              name: 'Catalog API v1 (Deprecated)',
              href: 'technical-documentation/api/zeenea-catalog-api-v1.html'
            },
            {
              name: 'Catalog API v2',
              href: 'technical-documentation/api/zeenea-catalog-api-v2.html'
            },
            {
              name: 'GraphQL API v2 Limitations',
              href: 'technical-documentation/api/zeenea-graphql-api-v2-limitations.html'
            },
            {
              name: 'Catalog Design API',
              href: 'technical-documentation/api/zeenea-catalog-design-api.html'
            },
            {
              name: 'Audit Trail API',
              href: 'technical-documentation/api/zeenea-audit-trail-apis.html'
            },
            {
              name: 'Data Product API',
              href: 'technical-documentation/api/zeenea-data-product-api.html'
            },
            {
              name: 'Access Request API',
              href: 'technical-documentation/api/zeenea-access-request-api.html'
            },
            {
              name: 'SCIM (System for Cross-Domain Identity Management) Protocol Support',
              href: 'technical-documentation/api/zeenea-scim-api.html'
            },
            {
              name: 'Authentication & User Provisioning — Architecture Diagrams',
              href: 'technical-documentation/api/scim-user-provisioning.html'
            },
            {
              name: 'User Management API',
              href: 'technical-documentation/api/zeenea-user-management-api.html'
            }
          ]
        },
        {
          name: 'Actian Data Intelligence Reference Architecture',
          href: 'technical-documentation/data-intelligence-reference-architecture.html'
        },
        {
          name: 'Security Flaws Management Policy',
          href: 'technical-documentation/zeenea-security-flaws-management.html'
        }
      ]
    },
  ];

  // ── Helpers ───────────────────────────────────────────────────────────────

  function getSiteRoot() {
    var tab = document.querySelector('.md-tabs__link');
    if (tab && tab.href) {
      return tab.href.substring(0, tab.href.lastIndexOf('/') + 1);
    }
    return window.location.origin + '/';
  }

  function getSiteRootPath() {
    var tab = document.querySelector('.md-tabs__link');
    if (tab && tab.href) {
      var url  = new URL(tab.href);
      var path = url.pathname;
      // Strip everything after the base segment (e.g. /digital-experience/9.5/latest/)
      var idx = path.lastIndexOf('/');
      return idx !== -1 ? path.substring(0, idx + 1) : '/';
    }
    return '/';
  }

  function normHref(href) {
    return href
      .replace(/\/index\.html$/, '')
      .replace(/\.html$/, '')
      .replace(/\/$/, '');
  }

  // ── Active-state helpers ──────────────────────────────────────────────────

  function isHomePage(currentPath) {
    var root = getSiteRootPath();
    return (
      currentPath === root ||
      currentPath === root + 'index.html' ||
      currentPath === root.replace(/\/$/, '')
    );
  }

  function isSectionActive(currentPath, sectionKey) {
    if (!sectionKey) return isHomePage(currentPath);

    var pathSegs = currentPath.split('/').filter(Boolean).map(function(s) {
      return s.replace(/\.html$/, '');
    });
    var keySegs = sectionKey.split('/').filter(Boolean);

    outer:
    for (var s = 0; s <= pathSegs.length - keySegs.length; s++) {
      for (var i = 0; i < keySegs.length; i++) {
        if (pathSegs[s + i] !== keySegs[i]) continue outer;
      }
      return true;
    }
    return false;
  }

  function isPageActive(currentPath, href) {
    var norm = normHref(href);
    if (!norm) return false;

    var pathSegs = currentPath.split('/').filter(Boolean);
    var hrefSegs = norm.split('/').filter(Boolean);
    if (hrefSegs.length === 0) return false;

    outer:
    for (var s = 0; s <= pathSegs.length - hrefSegs.length; s++) {
      for (var i = 0; i < hrefSegs.length; i++) {
        var hs = hrefSegs[i].replace(/\.html$/, '');
        var ps = pathSegs[s + i].replace(/\.html$/, '');
        if (ps !== hs) continue outer;
      }
      return true;
    }
    return false;
  }

  function subtreeHasActive(pages, currentPath) {
    for (var i = 0; i < pages.length; i++) {
      if (isPageActive(currentPath, pages[i].href)) return true;
      if (pages[i].pages && subtreeHasActive(pages[i].pages, currentPath)) return true;
    }
    return false;
  }

  // ── Tab active-state ──────────────────────────────────────────────────────

  function getTabLabelText(tabLink) {
    var text = '';
    tabLink.childNodes.forEach(function(node) {
      if (node.nodeType === Node.TEXT_NODE) text += node.textContent;
    });
    text = text.trim();
    return text || (tabLink.textContent || '').trim();
  }

  function fixTabLinks() {
    var base        = getSiteRoot();
    var currentPath = window.location.pathname;

    var activeSectionKey = null;
    SECTIONS.forEach(function(section) {
      if (isSectionActive(currentPath, section.key)) {
        if (activeSectionKey === null || section.key.length > activeSectionKey.length) {
          activeSectionKey = section.key;
        }
      }
    });

    document.querySelectorAll('.md-tabs__item').forEach(function(tabItem) {
      var tabLink = tabItem.querySelector('.md-tabs__link');
      if (!tabLink) return;

      var labelText = getTabLabelText(tabLink);
      var section   = null;
      for (var i = 0; i < SECTIONS.length; i++) {
        if (SECTIONS[i].label === labelText) { section = SECTIONS[i]; break; }
      }

      if (section) tabLink.href = base + section.href;

      var isActive = section ? (section.key === activeSectionKey) : false;
      if (isActive) {
        tabItem.classList.add('md-tabs__item--active');
        tabLink.classList.add('md-tabs__link--active');
      } else {
        tabItem.classList.remove('md-tabs__item--active');
        tabLink.classList.remove('md-tabs__link--active');
      }
    });
  }

  // ── Sidebar builder ───────────────────────────────────────────────────────

  function buildPageList(pages, base, currentPath, depth) {
    var ul = document.createElement('ul');
    ul.className = 'cn-sublist cn-sublist--depth-' + depth;

    pages.forEach(function(page) {
      var li = document.createElement('li');
      li.className = 'cn-subitem';

      var hasChildren = page.pages && page.pages.length > 0;
      var pageActive  = isPageActive(currentPath, page.href);

      if (hasChildren) {
        var row = document.createElement('div');
        row.className = 'cn-subheader';

        var a = document.createElement('a');
        a.href        = base + page.href;
        a.className   = 'cn-sublink cn-sublink--parent' + (pageActive ? ' cn-sublink--active' : '');
        a.textContent = page.name;
        row.appendChild(a);

        var arrow = document.createElement('span');
        arrow.className = 'cn-arrow cn-arrow--sub';
        arrow.innerHTML = '&#8250;';

        var childList           = buildPageList(page.pages, base, currentPath, depth + 1);
        var anyDescendantActive = subtreeHasActive(page.pages, currentPath);
        var collapsed           = !(pageActive || anyDescendantActive);

        arrow.style.transform   = collapsed ? 'rotate(0deg)' : 'rotate(90deg)';
        childList.style.display = collapsed ? 'none' : '';

        row.appendChild(arrow);
        li.appendChild(row);
        li.appendChild(childList);

        (function(arrowEl, listEl, initCollapsed) {
          var isCollapsed = initCollapsed;
          arrowEl.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            isCollapsed = !isCollapsed;
            listEl.style.display    = isCollapsed ? 'none' : '';
            arrowEl.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)';
          });
        })(arrow, childList, collapsed);

      } else {
        var a = document.createElement('a');
        a.href        = base + page.href;
        a.className   = 'cn-sublink' + (pageActive ? ' cn-sublink--active' : '');
        a.textContent = page.name;
        li.appendChild(a);
      }

      ul.appendChild(li);
    });

    return ul;
  }

  // ── Scroll to active link ─────────────────────────────────────────────────

  function getScrollParent(startEl) {
    var el = startEl ? startEl.parentElement : null;
    while (el && el !== document.documentElement) {
      var style    = window.getComputedStyle(el);
      var overflow = style.overflow + style.overflowY;
      if (/(auto|scroll)/.test(overflow) && el.scrollHeight > el.clientHeight) return el;
      el = el.parentElement;
    }
    return null;
  }

  function scrollToActive(sidebar) {
    var activeLink = sidebar.querySelector('.cn-sublink--active, .cn-label--active');
    if (!activeLink) return;

    function doScroll() {
      var scrollEl = getScrollParent(activeLink);
      if (!scrollEl) scrollEl = sidebar.closest('.md-sidebar__scrollwrap') || sidebar;

      var linkRect = activeLink.getBoundingClientRect();
      if (linkRect.height === 0) { requestAnimationFrame(doScroll); return; }

      var wrapRect   = scrollEl.getBoundingClientRect();
      var offsetTop  = linkRect.top - wrapRect.top;
      var wrapHeight = scrollEl.clientHeight;
      var linkHeight = activeLink.offsetHeight;

      if (offsetTop < 0 || offsetTop + linkHeight > wrapHeight) {
        var desired = scrollEl.scrollTop + offsetTop - (wrapHeight / 2) + (linkHeight / 2);
        scrollEl.scrollTop = Math.max(0, Math.min(desired, scrollEl.scrollHeight - wrapHeight));
      }
    }

    requestAnimationFrame(doScroll);
  }

  // ── Main nav builder ──────────────────────────────────────────────────────

  function buildNav() {
    var sidebar = document.querySelector('.md-sidebar--primary .md-sidebar__scrollwrap');
    if (!sidebar) return;

    var existing = sidebar.querySelector('.cn-nav');
    if (existing) existing.parentNode.removeChild(existing);

    var currentPath = window.location.pathname;
    var base        = getSiteRoot();

    var nav = document.createElement('nav');
    nav.className = 'cn-nav';

    var activeSectionKey = null;
    SECTIONS.forEach(function(section) {
      if (isSectionActive(currentPath, section.key)) {
        if (activeSectionKey === null || section.key.length > activeSectionKey.length) {
          activeSectionKey = section.key;
        }
      }
    });

    SECTIONS.forEach(function(section) {
      var isActive = (section.key === activeSectionKey);

      var item = document.createElement('div');
      item.className = 'cn-item' + (isActive ? ' cn-item--active' : '');

      var header = document.createElement('div');
      header.className = 'cn-header';

      var link = document.createElement('a');
      link.href        = base + section.href;
      link.className   = 'cn-label' + (isActive ? ' cn-label--active' : '');
      link.textContent = section.label;
      header.appendChild(link);

      if (section.pages && section.pages.length > 0) {
        var arrow = document.createElement('span');
        arrow.className = 'cn-arrow';
        arrow.innerHTML = '&#8250;';

        var subList   = buildPageList(section.pages, base, currentPath, 1);
        var collapsed = !isActive;

        arrow.style.transform   = collapsed ? 'rotate(0deg)' : 'rotate(90deg)';
        subList.style.display   = collapsed ? 'none' : '';

        header.appendChild(arrow);
        item.appendChild(header);
        item.appendChild(subList);

        (function(arrowEl, listEl, initCollapsed) {
          var isCollapsed = initCollapsed;
          arrowEl.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            isCollapsed = !isCollapsed;
            listEl.style.display    = isCollapsed ? 'none' : '';
            arrowEl.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)';
          });
        })(arrow, subList, collapsed);

      } else {
        item.appendChild(header);
      }

      nav.appendChild(item);
    });

    var nativeNav = sidebar.querySelector('.md-nav--primary');
    if (nativeNav) nativeNav.style.display = 'none';

    var inner = sidebar.querySelector('.md-sidebar__inner');
    if (inner) inner.insertBefore(nav, inner.firstChild);

    scrollToActive(sidebar);
  }

  // ── Boot ──────────────────────────────────────────────────────────────────

  function init() {
    buildNav();
    fixTabLinks();
  }

  if (typeof document$ !== 'undefined') {
    document$.subscribe(init);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
