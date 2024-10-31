import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import BaseLayout from "../views/BaseLayout";
import HomePage from "../views/HomePage";
import RegisterPage from "../views/RegisterPage";
import MyFavoritesPage from "../views/MyFavoritesPage";
import ProfilePage from "../views/ProfilePage";
import DiscordCallback from "../components/DiscordCallback";
import Toastify from "toastify-js";
import GameDetail from "../views/GameDetail";

const url = `http://localhost:3000`;

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "Already logged in",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#FF0000",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "Already logged in",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#FF0000",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/auth/discord/callback",
    element: <DiscordCallback />,
  },
  {
    element: <BaseLayout />,

    children: [
      {
        path: "/",
        element: <HomePage url={url} />,
      },
      {
        path: "/my-favorites",
        element: <MyFavoritesPage url={url} />,
        loader: () => {
          if (!localStorage.access_token) {
            Toastify({
              text: "You must login first",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "bottom", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "#FF0000",
              },
              onClick: function () {}, // Callback after click
            }).showToast();
            return redirect("/");
          }
          return null;
        },
      },
      {
        path: "/profile",
        element: <ProfilePage url={url} />,
        loader: () => {
          if (!localStorage.access_token) {
            Toastify({
              text: "You must login first",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "bottom", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "#FF0000",
              },
              onClick: function () {}, // Callback after click
            }).showToast();
            return redirect("/");
          }
          return null;
        },
      },
      {
        path: "/game-detail/:id",
        element: <GameDetail url={url} />,
        loader: () => {
          if (!localStorage.access_token) {
            Toastify({
              text: "You must login first",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "bottom", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "#FF0000",
              },
              onClick: function () {}, // Callback after click
            }).showToast();
            return redirect("/");
          }
          return null;
        },
      },
    ],
  },
]);

export default router;
