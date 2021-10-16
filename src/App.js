import { useSelector } from 'react-redux';

// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
// ----------------------------------------------------------------------

export default function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  console.log(isLoggedIn, '-----------loggedin');

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router isLoggedIn={isLoggedIn} />
    </ThemeConfig>
  );
}
