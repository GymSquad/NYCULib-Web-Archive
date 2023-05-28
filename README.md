# Web Archive

National Yang Ming Chiao Tung University Web Archiving System

[![Logo](https://www.nycu.edu.tw/wp-content/uploads/2021/02/210204-NYCU.png)](https://www.nycu.edu.tw/)

<p align="center">
<a aria-label="Next logo" href="https://nextjs.org">
    <img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
</a>
<a href="https://www.prisma.io">
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
</a>
<a href="https://tailwindcss.com">
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
</a>
</p>

## Boot up

You can inspect what services are running

```bash
  docker compose ps
```

Boot up database container

```bash
  cd /home/webarchive/web/NYCULib-Web-Archive
  docker compose up -d
```

Boot up nginx container

```bash
  cd /home/webarchive/web/webserver
  docker compose up -d
```

Boot up next.js

```bash
  cd /home/webarchive/web/NYCULib-Web-Archive
  pm2 start pm2.json --env production
```

## Contributing

### Notice

If you modify the content in the next.js project, you need to run the following command to build the project and restart the next.js server as the above step

```bash
  npm run build
```

If you modify the database schema, you need to run the following command to generate the Prisma client

```bash
  npm prisma generate
```

### Commit

We recommend you use emoji to maintain consistency

You can refer to this:

> [Gitmoji](https://gitmoji.dev/)

### Push

Check if there is no linting error and format error in advance

## Tools

Explore the data in **Prisma Studio**

```bash
  npx prisma studio
```

Run ESLint on the files in `src`

```bash
  npm run lint
```

Check if the files in `src` are formatted

```bash
  npm run fmt:check
```

Fix format over the files in `src` (Beware!)

```bash
  npm run fmt:fix
```
