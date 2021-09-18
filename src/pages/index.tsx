import Layout from '../modules/common/Layout/Layout';
import Link from 'next/link';

function Home() {
  return (
    <Layout noBack>
      <ul className="text-xl font-bold tracking-wide">
        <li>
          <Link href="/counter">
            <a>Counter</a>
          </Link>
        </li>
        <li>
          <Link href="/temperature-converter">
            <a>Temperature Converter</a>
          </Link>
        </li>
        <li>
          <Link href="/flight-booker">
            <a>Flight Booker</a>
          </Link>
        </li>
      </ul>
    </Layout>
  );
}

export default Home;
