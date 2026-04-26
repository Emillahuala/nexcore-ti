import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Automatización de Procesos RPA | Servicios NexCore',
  description: 'Aumenta la eficiencia de tu empresa con soluciones RPA e integración de procesos.',
  alternates: {
    canonical: 'https://nexcore-ti.com/servicios/automatizacion-procesos',
  }
};

export default function AutomatizacionPage() {
  return (
    <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto">
      <Breadcrumbs />
      <h1 className="text-4xl font-bold mb-8">Automatización de Procesos (RPA)</h1>
      <article className="prose lg:prose-xl">
        <p>
          Minimiza errores humanos, reduce costos y escala las operaciones de tu negocio integrando
          nuestras soluciones de automatización inteligente.
        </p>
        <h2>Beneficios de la Automatización</h2>
        <ul>
          <li>Reducción del 90% en tareas repetitivas</li>
          <li>Integración fluida con sistemas legacy</li>
          <li>Retorno de inversión (ROI) a corto plazo</li>
        </ul>
      </article>
    </main>
  );
}
