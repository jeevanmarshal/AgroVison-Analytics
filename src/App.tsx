import { AppLayout } from './components/layout/AppLayout';
import { PageContainer } from './components/layout/PageContainer';
import { DashboardProvider } from './features/dashboard/context/DashboardContext';
import { DashboardPage } from './features/dashboard/DashboardPage';

function App() {
  return (
    <DashboardProvider>
      <AppLayout>
        <PageContainer>
          <DashboardPage />
        </PageContainer>
      </AppLayout>
    </DashboardProvider>
  );
}

export default App;
