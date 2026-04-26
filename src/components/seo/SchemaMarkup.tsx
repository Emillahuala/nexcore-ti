import { FC } from 'react';

interface SchemaProps {
  schemaData: Record<string, any>;
}

export const SchemaMarkup: FC<SchemaProps> = ({ schemaData }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
