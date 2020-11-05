# seven-parkiraj-me-backend

## Setup

### Install dependecies

To install dependecies, in your terminal do the following steps:

1. Be sure that you are in correct folder

Your current directory should end with `seven\backend`.

2. Run install command

```bash
npm install
```

3. Setup your local database

You should download and install [pgAdmin](https://www.pgadmin.org/download/).

Once downloaded set it up and get your connection url (we will use it in a moment).

To get a connection url you need to

* opis
* postupak
* netko

Once database is created and you have your connection url, in `backend` folder create `.env` file.

Copy this into the created file

```
DATABASE_URL=<database-connection-url>
```

and replace `<database-connection-url>` with you local connection url.

## Code writing

### Running application locally

To run you app locally you need to run following command inside your terminal

```bash
npm run dev
```

### Branching

When you want to add a new feature to the app do the following

#### 1. Checkout to branch `backend` and pull new changes from the GitLab server

```bash
git checkout backend

git pull origin backend
```

#### 2. Create your new branch

Your branch should be a descriptive name for what you will do in this branch

```bash
git checkout -b new-branch
```

#### 3. Once finished with you work, create a merge request

To create a merge request, first you need to push all changes to the GitLab server.

```bash
git push origin
```

After that go to the [GitLab](https://gitlab.com/Cubi5/seven/-/merge_requests/new) and:

* Select your branch as a source branch and `backend` as a target branch.
* If neccessary, provide a short description of what have you done
* Review process (still to determen)
* Press `Submit merge request`

After everyone reviewed the merge request and all changes are applied you may merge the merge request.

Make sure your branch is deleted by visiting [this link](https://gitlab.com/Cubi5/seven/-/branches/active)

### Deployment

To be determened!
