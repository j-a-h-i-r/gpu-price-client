import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import { Button } from 'antd';

const Home: NextPage = () => {
  return <>
    <nav>
      <Button>
        <Link href={"/gpus"}>
          View all GPUs
        </Link>
      </Button>
    </nav>
  </>
}

export default Home
