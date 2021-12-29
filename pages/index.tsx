import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return <>
    <nav>
      <Link href={"/gpus"}>GPUs</Link>
    </nav>
  </>
}

export default Home
