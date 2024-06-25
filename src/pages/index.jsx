import dynamic from "next/dynamic";


const DynamicMenu = dynamic(() => import('src/components/Menu'));

const Home = () => {
  return (
    <>
      <DynamicMenu />
    </>
  )
}

export default Home;