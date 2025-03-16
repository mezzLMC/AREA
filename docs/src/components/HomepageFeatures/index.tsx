import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faPlug, faBell, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: IconDefinition;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Simple Webhook Management',
    icon: faPlug,
    description: (
      <>
        AREA provides an intuitive interface to easily create and manage your webhooks, simplifying integration between various services.
      </>
    ),
  },
  {
    title: 'Flexible Integrations',
    icon: faCode,
    description: (
      <>
        Easily connect your applications and services with flexible integrations tailored to your specific needs.
      </>
    ),
  },
  {
    title: 'Instant Notifications',
    icon: faBell,
    description: (
      <>
        Receive real-time notifications to stay informed about important events and react quickly to changes.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4 ')}>
      <div className="text--center">
        <FontAwesomeIcon icon={icon} className={styles.featureIcon} size="3x" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
