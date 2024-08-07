import { useCallback, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";

import { useMenu } from "../context/MenuContext";
import styles from "../styles/index.module.scss";

const AdminPage = ({ menuItems }) => {
  const { addToMenu, removeFromMenu, menuItems: contextMenuItems } = useMenu();
  const [activeIndex, setActiveIndex] = useState(0);

  console.log('Menu Items received from server:', menuItems);
  console.log('Current items in menu context:', contextMenuItems);

  const handleAddOrRemoveFromMenu = useCallback(
    (index) => {
      const currentItem = menuItems[index];

      if (!currentItem) {
        console.error('Current item is undefined at index', index);
        return;
      }

      console.log('Handling menu item at index:', index, 'Item:', currentItem);

      const itemInMenu = contextMenuItems.find(
        (menuItem) =>
          menuItem.id === currentItem.id && menuItem.origin === "/AdminPage"
      );

      if (itemInMenu) {
        console.log('Item already in menu, removing:', currentItem);
        removeFromMenu({
          id: currentItem.id,
          origin: "/AdminPage",
        });
      } else {
        console.log('Item not in menu, adding:', currentItem);
        addToMenu({
          id: currentItem.id,
          image: currentItem.imagen,
          price: currentItem.precio,
          name: currentItem.nombre,
          descrip: currentItem.descripcion,
          origin: "/AdminPage",
        });
      }
    },
    [addToMenu, removeFromMenu, contextMenuItems, menuItems]
  );

  return (
    <>
      <Head>
        <title>AdminPage</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.Main}>
        <header>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Actualizar el índice activo
            modules={[EffectCoverflow]}
          >
            {menuItems.map((item, index) => (
              <SwiperSlide key={index}>
                <section>
                  <Image
                    src={item.imagen}
                    alt={`Imagen ${index + 1}`}
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                  <h3>{item.nombre}</h3>
                  <h3>{item.precio} $</h3>
                  <p>{item.descripcion}</p>
                </section>
              </SwiperSlide>
            ))}
          </Swiper>
        </header>
      </main>
      <div className={styles.MenuButton}>
        {menuItems.length > 0 && (
          <button onClick={() => handleAddOrRemoveFromMenu(activeIndex)}>
            {contextMenuItems.some(
              (menuItem) =>
                menuItem.id === menuItems[activeIndex]?.id &&
                menuItem.origin === "/AdminPage"
            )
              ? "Remover del Menu"
              : "Agregar al Menu"}
          </button>
        )}
      </div>
      <Link href={"/"}>Menu</Link>
    </>
  );
};

export async function getServerSideProps() {
  try {
    console.log('Fetching menu items from API...');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu`);
    
    if (!response.ok) {
      console.error('Failed to fetch menu items:', response.statusText);
      throw new Error('Failed to fetch');
    }
    
    const data = await response.json();
    console.log('Menu items fetched successfully:', data);
    
    return {
      props: {
        menuItems: data,
      },
    };
  } catch (err) {
    console.error('Error in getServerSideProps:', err.message);
    return {
      props: {
        menuItems: [],
        error: err.message,
      },
    };
  }
}

export default AdminPage;