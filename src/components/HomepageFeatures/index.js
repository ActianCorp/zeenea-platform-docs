import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Actian Data Intelligence Platform documentation has moved.',
    doc: "https://docs.actian.com/zeenea/",
    description: (
      <>
      Be sure to update any bookmarks to the new URL: https://docs.actian.com/zeenea/
      </>
    ),
  },
];

function Feature({title, doc, description}) {
  return (
      <center>
          <Heading as="h3"><b>{title}</b></Heading>
          <p>{description}</p>
        <br />
          <Link className="button button--primary button--md" to={doc}>
            Go to the new site &#8250;&#8250;
          </Link>

      </center>

  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
      </div>
    </section>
  );
}
