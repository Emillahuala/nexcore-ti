import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Servicios de Transformación Digital y TI | NexCore',
  description: 'Descubre nuestros servicios de automatización de procesos, consultoría TI y desarrollo a medida.',
  alternates: {
    canonical: 'https://nexcore-ti.com/servicios',
  }
};

export default function ServiciosPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "¿Qué es la automatización de procesos TI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Consiste en utilizar tecnología para ejecutar procesos de negocio o TI sin intervención manual."
      }
    }]
  };

  return (
    <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto">
      <Breadcrumbs />
      <h1 className="text-4xl font-bold mb-8 text-slate-800">Nuestros Servicios</h1>
      <p className="text-lg text-slate-600 mb-12">
        Ofrecemos soluciones innovadoras para modernizar tu infraestructura.
      </p>
      {/* List of services... */}
      
      <SchemaMarkup schemaData={faqSchema} />
    </main>
  );
}
