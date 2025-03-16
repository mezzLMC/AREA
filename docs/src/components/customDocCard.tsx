import * as React from 'react';
import classNames from 'classnames';

interface CustomDocCardProps {
  title: string;
  description: string;
  link: string;
  emoji?: string;
  small?: boolean;
}

export default function CustomDocCard(props : CustomDocCardProps) {
  const { title, description, link, emoji, small = false } = props;
  const linkClasses = classNames({
    card: true,
    cardContainer: true,
    'padding--lg': !small,
    'padding--md': small,
  });
  const cardClasses = classNames({
    'custom-doc-card': true,
    'margin-bottom--lg': !small,
    'margin-bottom--sm': small,
    'custom-doc-card--small': small,
  });
  return (
      <article className={ cardClasses }>
        <a className={ linkClasses }
          href={ link }
        >
          <h2 className="cardTitle" title={title}>
            {emoji || '📄️'} {title}
          </h2>
          <p className="cardDescription" title={ description }>
            {description}
          </p>
        </a>
      </article>
  );
}
