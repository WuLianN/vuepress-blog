---
date: '2020-06-06'
slug: js
tag:
- Other

title: git 基本指令
description: git 指令详解
author: 夜深_静悟
location: 广州
image: 'https://api.bearcub.club/tag/bird.jpg'
meta:
  - name: title
    content: git 基本指令

  - name: description
    content: git 指令详解

  - name: keywords
    content: git

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---

## 获取-Git-仓库

更多详情：[Git-基础-获取-Git-仓库](https://git-scm.com/book/zh/v2/Git-基础-获取-Git-仓库)

**初始化仓库**

```js
git init
```

<br>

**克隆仓库**

```js
git clone 地址 
```

<br>

## 记录每次更新到仓库

更多详情：[Git-基础-记录每次更新到仓库](https://git-scm.com/book/zh/v2/Git-基础-记录每次更新到仓库)

**添加文件**

```js
git add 文件  如：git add .  添加所有文件
```

<br>

**移除文件**

```js
git rm 文件
```

<br>

**移动文件**

```js
// 要在 Git 中对文件改名，可以这么做：
git mv file_from file_to

// 如 重命名
git mv README.md README

// 其实，运行 git mv 就相当于运行了下面三条命令：
mv README.md README
git rm README.md
git add README
```

<br>

**提交**

```js
git commit -m '描述' 
```

<br>

**查看状态**

```js
git status

// 状态简览
git status -s
```

<br>

## 查看提交历史

更多详情：[Git-基础-查看提交历史](https://git-scm.com/book/zh/v2/Git-基础-查看提交历史)

```
git log
```

<br>

## 撤销操作

更多详情：[Git-基础-撤销操作](https://git-scm.com/book/zh/v2/Git-基础-撤消操作)

**撤销操作**

```js
// 有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有 --amend 选项的 // 提交命令来重新提交：
git commit --amend
```

```js
// 例如，你提交后发现忘记了暂存某些需要的修改，可以像下面这样操作：
git commit -m 'initial commit'
git add forgotten_file
git commit --amend
```

<br>

**撤销对文件的修改**

如果你并不想保留对 CONTRIBUTING.md 文件的修改怎么办？

```js
git status
```

```js
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   CONTRIBUTING.md
```

输入这条指令即可：

```js
git checkout -- CONTRIBUTING.md
```

<br>

## 分支

**创建分支**

```js
git branch <分支名>    如：git branch dev
```

<br>

**切换分支**

```js
git checkout <分支名>  如：git checkout dev
```

<br>

**合并分支**

```js
① git merge <分支名>     如：git merge dev (分支在master)
```

```js
② git rebase <分支名>    如：git rebase dev (分支在master)
```

<br>

## 远程仓库的使用

更多详见：[Git-基础-远程仓库的使用](https://git-scm.com/book/zh/v2/Git-基础-远程仓库的使用)

**查看远程仓库**

```js
git remote -v 
```

<br>

**添加远程仓库**

```js
git remote add <shortname> <url>
如：git remote add origin https://github.com/WuLian/blog
```

<br>

**从远程仓库中抓取与拉取**

```js
git fetch <remote>
```

<br>

**推送到远程仓库**

```js
git push <remote> <branch>
    
// 将 master 分支推送到 origin 服务器    
git push origin master

// 加用户名: 
git push -u origin master
```

<br>

**查看某个远程仓库**

```js
git remote show <remote>
如：git remote show origin
```

<br>

**远程仓库的重命名与移除**

```js
// 修改一个远程仓库的简写名
git remote rename

// 想要将 pb 重命名为 paul
git remote pb paul
```

<br>

**拉请求后合并**

```js
git pull 等价于 git fetch; git merge
```

```js
git pull --rebase 等价于 git fetch; git rebase
```

<br>

**删除与远程仓库的关联**

```js
git remote rm origin
```

<br>

**查看远程仓库地址**

```js
git remote get-url origin
```

<br>

**设置远程仓库地址**

```js
git remote set-url origin 地址
```

<br>

**添加上流仓库**

```js
git remote add upstream 地址 (upstream 自定义)
```

<br>


**更新上流仓库**

```git
git fetch upstream
git merge upstream/master
```

<br>

## 打标签

更多详情：[Git-基础-打标签](https://git-scm.com/book/zh/v2/Git-基础-打标签)

**列出标签**

```js
git tag
```

<br>


**创建标签**

Git 支持两种标签：**`轻量标签`**（lightweight）与**`附注标签`**（annotated）。

轻量标签很像一个不会改变的分支——它只是某个特定提交的引用。

而附注标签是存储在 Git 数据库中的一个完整对象， 它们是可以被校验的，其中包含打标签者的名字、电子邮件地址、日期时间， 此外还有一个标签信息，并且可以使用 GNU Privacy Guard （GPG）签名并验证。

<br>

**附注标签**

```js
git tag -a v1.4 -m "my version 1.4"
```

通过使用 `git show` 命令可以看到标签信息和与之对应的提交信息：

```js
$ git show v1.4
tag v1.4
Tagger: Ben Straub <ben@straub.cc>
Date:   Sat May 3 20:19:12 2014 -0700

my version 1.4

commit ca82a6dff817ec66f44342007202690a93763949
Author: Scott Chacon <schacon@gee-mail.com>
Date:   Mon Mar 17 21:52:11 2008 -0700

    changed the version number
```

<br>

**轻量标签**

```js
git tag v1.4-lw
```

```js
$ git show v1.4-lw
commit ca82a6dff817ec66f44342007202690a93763949
Author: Scott Chacon <schacon@gee-mail.com>
Date:   Mon Mar 17 21:52:11 2008 -0700

    changed the version number
```

<br>

**后期打标签**

```js
$ git log --pretty=oneline
166ae0c4d3f420721acbb115cc33848dfcc2121a started write support // v1.3
9fceb02d0ae598e95dc970b74767f19372d61af8 updated rakefile // 这里
964f16d36dfccde844893cac5b347e7b3d44abbc commit the todo // v1.1
8a5cbc430f1a9c3d00faaeffd07798508422908a updated readme // v1.0
```

现在，假设在 v1.2 时你忘记给项目打标签，也就是在 “updated rakefile” 提交。 你可以在之后补上标签。 要在那个提交上打标签，你需要在命令的末尾指定提交的校验和（或部分校验和）：

```js
git tag -a v1.2 9fceb02
```

<br>

**共享标签**

```js
git push origin <tagname>

如：git push origin v1.5
```

一次性推送很多标签

```js
git push origin --tags
```


<br>

**删除标签**

要删除掉你本地仓库上的标签

```js
git tag -d <tagname>
     
如：git tag -d v1.4-lw
```

注意上述命令并不会从任何远程仓库中移除这个标签，你必须用 `git push `

`:refs/tags/` 来更新你的远程仓库：

第一种变体是 `git push  :refs/tags/` ：

```js
git push origin :refs/tags/v1.4-lw
```

第二种更直观的删除远程标签的方式是：

```js
git push origin --delete <tagname>
```

<br>


## 忽略文件

创建一个名为 `.gitignore` 的文件，列出要忽略的文件的模式

文件 `.gitignore` 的格式规范如下：

- 所有空行或者以 `#` 开头的行都会被 Git 忽略。
- 可以使用标准的 glob 模式匹配，它会递归地应用在整个工作区中。
- 匹配模式可以以（`/`）开头防止递归。
- 匹配模式可以以（`/`）结尾指定目录。
- 要忽略指定模式以外的文件或目录，可以在模式前加上叹号（`!`）取反。



**例子**

```markdown
# 忽略所有的 .a 文件
*.a

# 但跟踪所有的 lib.a，即便你在前面忽略了 .a 文件
!lib.a

# 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
/TODO

# 忽略任何目录下名为 build 的文件夹
build/

# 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
doc/*.txt

# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
doc/**/*.pdf
```

<br>


## 练习git小游戏

[Learn Git Branching](https://learngitbranching.js.org/)



## 参考

[git 中文文档](https://git-scm.com/book/zh/v2)



