import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Actian Data Intelligence Platform documentation has moved.',
  },
];

function Feature({title}) {
  return (
      <center>
         <h2>Actian Data Intelligence Platform documentation has moved.</h2>
        <br />
        Be sure to update any bookmarks to the new URL: <a href="https://docs.actian.com/zeenea/">https://docs.actian.com/zeenea/</a>
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
