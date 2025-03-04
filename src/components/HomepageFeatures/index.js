import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Documentation',
    doc: "/docs/zeenea-intro",
    png: "/img/home/zeenea-docs.svg",
    description: (
      <>
      Actian Zeenea Data Discovery Platform documentation.
      </>
    ),
  },
  {
    title: 'API Reference',
    doc: "https://docs.zeenea.com",
    png: "/img/home/zeenea-api.png",
    description: (
      <>
      Zeenea GraphQL Catalog <br />API reference.
      </>
    ),
  },
  {
    title: 'Product Updates',
    doc: "https://zeenea.com/product-updates/",
    png: "/img/home/list.png",
    description: (
      <>
      Product releases, new features, and connector highlights.
     </>
    ),
  },
];

function Feature({title, doc, png, description}) {
  return (
    <div className={clsx('col col--4')}>
        <div className="text--center">
          <img src={png} className="icon" alt="" />
          <div className="text--center padding-horiz--md">
          <Heading as="h3"><b>{title}</b></Heading> 
          <center>
            <div className="card-text">
              {description}
            </div>
          </center>
          </div>
        <br />
          <Link className="button button--primary button--md xxxxx" to={doc}>
            View &#8250;&#8250;
          </Link>
        </div>

    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
