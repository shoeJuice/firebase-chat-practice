import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { firebaseAdminConfig } from "../config/FirebaseApp";
import * as admin from "firebase-admin";
import nookies from "nookies";

const about = () => {
  return <div>about</div>;
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let adminAuth = null;
  let adminApp = null;
  if (admin.apps.length == 0) {
    adminApp = admin.initializeApp(firebaseAdminConfig);
    adminAuth = admin.auth(adminApp);
  }
  else{
   adminAuth = admin.auth();
  }

  try {
    const cookies = nookies.get(ctx);
    const token = await adminAuth.verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: {
        uid,
        email,
      },
    };
  } catch (error) {
    console.error(error);
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return {
      props: {} as never,
    };
  }
};

export default about;
