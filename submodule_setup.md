# SUBMODULE SETUP

The main app repository contains the **frontend** and **backend** as Git submodules.
Each submodule is an independent Git repository tracked by this main repo.

---

# 📁 Project Structure

```
main-app/
  ├── frontend/   # Frontend repo (submodule)
  ├── backend/    # Backend repo (submodule)
  └── .gitmodules
```

---

# 🚀 Initial Setup

## Clone with submodules (recommended)

```bash
git clone --recurse-submodules <main-repo-url>
cd main-app
```

---

## If already cloned (without submodules)

```bash
git submodule update --init --recursive
```

---

# ➕ Adding Frontend / Backend (Submodules)

If setting up this repo from scratch:

```bash
git submodule add <frontend-repo-url> frontend
git submodule add <backend-repo-url> backend
```

Example:

```bash
git submodule add https://github.com/your-org/frontend.git frontend
git submodule add https://github.com/your-org/backend.git backend
```

Then commit:

```bash
git add .
git commit -m "Added frontend and backend submodules"
git push
```

---

# 🔄 Pulling Latest Changes (VERY IMPORTANT)

## Standard safe workflow

```bash
git pull
git submodule update --init --recursive
```

---

## Alternative (single command)

```bash
git pull --recurse-submodules
```

---

## What this does

| Command                | Purpose                             |
| ---------------------- | ----------------------------------- |
| `git pull`             | Updates main repo                   |
| `git submodule update` | Syncs submodules to correct version |

---

# ✏️ Working on Frontend / Backend

## Step 1: Enter submodule

```bash
cd frontend
```

---

## Step 2: Make changes and push

```bash
git add .
git commit -m "Your changes"
git push
```

---

## Step 3: Update main repo pointer

```bash
cd ..
git add frontend
git commit -m "Updated frontend version"
git push
```

---

## 🔁 Same steps apply for backend

```bash
cd backend
```

---

# 🟢 Working Only on Main Repo (e.g., README)

If you only modify files in the main repo:

```bash
git add .
git commit -m "Update main repo"
git push
```

👉 No submodule steps required.

---

# 🔄 Getting Latest Changes from Submodules

## Option 1 (use version locked in main repo)

```bash
git submodule update --init --recursive
```

---

## Option 2 (pull latest from submodule repo manually)

```bash
cd frontend
git pull
cd ..
git add frontend
git commit -m "Updated frontend to latest"
git push
```

---

## Option 3 (auto update to latest remote)

```bash
git submodule update --remote
```

⚠️ Use carefully — this ignores version locking.

---

# ⚠️ Common Mistakes

* Running only `git pull` (submodules remain outdated)
* Forgetting to commit submodule changes in main repo
* Editing submodule without committing inside it
* Cloning without `--recurse-submodules`

---

# 🧠 Important Concepts

* Submodules are **independent repositories**
* Main repo stores **a pointer to a commit**, not actual code
* You must commit changes in **both places** when modifying submodules

---

# 💡 Recommended Config

Run once:

```bash
git config --global submodule.recurse true
```

Then use:

```bash
git pull --recurse-submodules
```

---

# 🏁 Quick Cheat Sheet

## Push flow (when changing frontend/backend)

```bash
cd frontend
git add .
git commit -m "changes"
git push

cd ..
git add frontend
git commit -m "update frontend"
git push
```

---

## Pull flow

```bash
git pull
git submodule update --init --recursive
```

---

## Main-only changes

```bash
git add .
git commit -m "update main"
git push
```

---

# ✅ Summary

* Use submodules to keep repos independent
* Always commit twice when modifying submodules
* Always update submodules after pulling

---


## ⚠️ Common Issue: Submodule Added Incorrectly

### Problem

If you try to add a submodule from an **empty repository**, you may see:

```
fatal: You are on a branch yet to be born
```

And later:

```
warning: adding embedded git repository
```

This means the repo was added as a **normal folder**, not a proper submodule.

---

### Why this happens

Git submodules require the target repository to have **at least one commit**.

---

### Fix

#### 1. Remove incorrect submodule

```bash
git rm --cached <folder>
rm -rf <folder>
rm -rf .git/modules/<folder>
```

---

#### 2. Ensure remote repo has at least one commit

Go to the repo and add a file (e.g., README.md):

```bash
git add .
git commit -m "Initial commit"
git push
```

---

#### 3. Add submodule again

```bash
git submodule add <repo-url> <folder>
```

---

### Example

```bash
git submodule add https://github.com/your-org/backend.git backend
```

---

### Tip

Always follow this order:

1. Create repo
2. Add initial commit
3. Then add as submodule

---

## ⚠️ Another Issue: Submodule Already Exists Error

### Error

```
fatal: A git directory for '<submodule>' is found locally
```

---

### Fix

Remove leftover Git metadata:

```bash
rm -rf .git/modules/<submodule>
```

Then re-add:

```bash
git submodule add <repo-url> <submodule>
```

---
