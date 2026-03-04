import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, description, children, className = '' }: SectionProps) {
  return (
    <Card className={`fade-in ${className}`}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {description && (
          <Card.Subtitle className="mb-4 text-muted">{description}</Card.Subtitle>
        )}
        {children}
      </Card.Body>
    </Card>
  );
}
