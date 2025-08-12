import  { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { rootState } from "../redux/Store";
import { ToggleModal } from "../redux/ModalSlice";

import { FcGoogle } from "react-icons/fc";
import { X } from "lucide-react";

import { auth, provider, db } from "../FirebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

import { logIn } from "../redux/userSlice";
import { Link } from "react-router-dom";

export default function AuthModal() {
  const state = useSelector((state: rootState) => state.modalReducer.modalOpen);
  const userState = useSelector((state: rootState) => state.userReducer);

  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      dispatch(logIn(currentUser));
    });

    return () => unSub();
  }, []);

  const saveToDb = async (user: any) => {
    const docRef = doc(db, "user", user.uid);
    const userSnap = await getDoc(docRef);

    if (!userSnap.exists()) {
      await setDoc(docRef, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        favorites: [], // empty array for favorites
        readlist: [], // empty array for readlist
        createdAt: new Date(),
      });
    }
  };

  const handleSignUp = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      await saveToDb(results.user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div
      className={`${
        state ? "" : "hidden"
      } fixed inset-0 z-50  backdrop-blur-sm bg-black/70 flex items-center justify-center  `}
    >
      {userState.userObj ? (
        <div className="bg-white rounded-lg w-full max-w-xl mx-3 xl:mx-0 lg-mx-3 p-6 relative dark:bg-[#0D0D0D]">
          <button
            onClick={() => dispatch(ToggleModal())}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X
              className="cursor-pointer
          "
            />
          </button>
          <p
            className="dark:text-white text-center mb-6  font-pop text-2xl font-bold cursor-pointer text-black"
            onClick={() => dispatch(ToggleModal())}
          >
            {userState.Name}
            {"👋 "}
          </p>

          <div className="flex flex-col gap-y-3">
            <Link to="/favorites">
              <button className="w-full  dark:bg-gray-900 dark:text-white dark:border-none flex cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 hover:text-white items-center justify-center gap-2 border border-gray-300 rounded py-2 font-open hover:bg-gray-50">
                Favorites
              </button>
            </Link>

          
            <button
              className="w-full dark:bg-gray-900 dark:text-white dark:border-none flex cursor-pointer hover:bg-red-500 hover:text-white items-center justify-center gap-2 border border-gray-300 rounded py-2 font-open "
              onClick={logout}
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg w-full max-w-xl mx-3 xl:mx-0 lg-mx-3 p-6 relative dark:bg-[#0D0D0D]">
          <button
            onClick={() => dispatch(ToggleModal())}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X
              className="cursor-pointer
          "
            />
          </button>

          <h2 className="text-3xl font-pop font-bold text-center mt-4 xl:mt-0 lg:mt-0  dark:text-white ">
            {isLogin ? "Login to your account" : "Create an account"}
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6 font-open">
            {isLogin
              ? "You must be logged in to perform this action."
              : "Sign up to get started."}
          </p>

          <div className="space-y-2">
            <button
              className="w-full dark:bg-white dark:border-none flex cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 hover:text-white items-center justify-center gap-2 border border-gray-300 rounded py-2 font-open hover:bg-gray-50"
              onClick={handleSignUp}
            >
              <FcGoogle size={18} /> Continue with Google
            </button>
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="px-2 text-gray-400 text-sm font-open">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <p className="text-center text-sm text-gray-500 mt-4 font-open">
            {isLogin ? (
              <>
                Don’t have an account?
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
