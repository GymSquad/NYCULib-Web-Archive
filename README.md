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

## Run Locally

Clone the project

```bash
  git clone https://github.com/GymSquad/NYCULib-Web-Archive.git
```

Go to the project directory

```bash
  cd NYCULib-Web-Archive
```

Install dependencies

```bash
  npm ci
```

Create database container

```bash
  docker-compose up -d
```

Push the schema to the database

```bash
  npx prisma db push
```

Start the server 🎉 

```bash
  npm run dev
```

## Contributing

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
