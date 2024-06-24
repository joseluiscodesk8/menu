import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicMenu = dynamic(() => import('src/components/Menu'));

const Home = () => {
  return (
    <>
      <DynamicMenu />
      <Link href={"/SendOrder"}>sentOrder</Link>
    </>
  )
}

export default Home;