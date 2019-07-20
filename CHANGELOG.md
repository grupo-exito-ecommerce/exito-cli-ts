# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

### v2.6.0 2019-07-20

## Changed

* Change in the command `generate trigger <arn>` now this generates the names of the triggers with the vendor, in order to identify when you want to create triggers of the same branch but with different account

* Creation of commands

* `generate configDependencies <criteria>` : Command that takes the `current-dependencies.json` file from the current directory and generates an ` update-dependencies.json` file with the filtered dependencies and the format equal to the `dependencies` attribute of the file `manifest.json` 

> example: `success generate cd vtex.` : generates the file with all the dependencies that match the indicated criteria ` vtex.` 

* `run overWriteDependencies <criteria>` : Command that takes the file `update-dependencies.json` in the current directory and then takes care of searching all the projects in the directory to list them and allowing the selection of the projects to update . After selecting the projects, a validation is carried out to determine whether they have changes at the dependency level and, if so, the dependencies found are updated. this process updates the project version one digit and generates a message in the `CHANGELOG.md` file, indicating which changes were made.

* `aws runGitCommand <commandTouse>` command that allows you to select the projects in the current directory and is responsible for running the indicated git command.

> Example: `success run ov vtex. --verbose

### v2.5.0 2019-06-28

## Changed

* Change in the command that allows to update the name of the vendor of a project. Now the command searches the current directory and takes the project it finds and writes the vendor.

### v2.4.1 2019-06-21

#Fixed

* Error solution when creating the triggers, the urls were generated with the names of all the projects

### v2.3.1 2019-06-06

## Changed

* Change in the captured log when publishing a component in vtex, now the word `Failed to publish` is captured to be able to visualize all the build information in the codebuild.

### v2.3.0 2019-06-06

#Added

* Implementation of the command

* `generate triggerConfig` : This command will be used to create a base structure for the triggers that are created in codeCommit

Change in the commands

* `vtex set_vendor <vendor>` by `vtex setVendor <vendor>` 
* `vtex vtex_json` by ` vtex vtexJson` 
* `vtex npm_install` by ` vtex install <adminPackage> ` : This new command receives the option to install dependencies with either npm or yarn

### v2.2.22 2019-30-2019

## Changed

* Update of the command `aws clone` added the optional branch parameter to allow cloning a specific branch.

### v2.2.20 2019-30-2019

## Changed

* Update in the command used to perform the login in the vtex account and update the logs that are captured when link or publish in vtex, an error was corrected in windows when the triggers are created.

Implementation of the command

* `vtex set_vendor <vendor>` : This command will be used for the process of publishing a component in different accounts. has been verified and with vtex there is no problem when using projects from different accounts.

Command update

* `vtex run triggers` : The way local triggers are executed is renamed

### v2.2.13 2019-30-2019

## Changed

* Elimination of the following commands:

* `generate config` : Developers do not need the config folder.
* `generate docker` : The continuous integration process is simplified so that only the buildspec configured for the codebuild is used.

### v2.2.8 2019-26-05

#Added

* Creation of the following commands:

* `run update_triggers` : Command that executes aws cli to associate the indicated trigger in the selected json
* `generate trigger <arn>` : Command that generates the files used to associate the triggers with the codecommit
* `vtex npm_install` : Command that allows the installation of the dependencies in the react or node projects
* `vtex coverage` : Command that allows you to configure and execute tests with jest in react or node

Elimination of the following commands:

* `vtex set_vendor <vendor>` : It is not necessary since the echo of modifying the vendor does not solve the problem of multi site

### v2.1.4 2019-09-04

#Added

* Creation of the following commands

* `generate vtex_json` : Command that allows you to create the vtex configuration file, in this file they store the user's credentials.
* `generate docker <environment> <vendor> <workspace> <email>` : Command to create the .dockerfile files for the continuous integration process. you need to pass the environment 'prod' or 'dev'.
* `generate sonar <repository> <version> <src>` : Command that allows you to create the sonar file, you need to pass the name of the repository.
* `vtex login <account> <workspace> <email>` : Command that allows the login by console.
* `vtex set_vendor <vendor>` : Command that allows you to rename the vendor of a project. This command is used to rename projects and allow multi-site

The commands aws, vtex, infra are created

 ``` bash
aws Aws options
aws clone <criteria> [all] Clone specific list of projects from aws, if your add the option <all>
 ``` 

 ``` bash
infra Proyects infra options
infra update Update the continuous integration and commit the changes.
 ``` 

 ``` bash
vtex Vtex options
vtex run <command> [all] Execute specific command from vtex, the current commands suport is: <link>, <publish>
vtex publish Publish only one component into Vtex
vtex login <account> <workspace> <email> Set credentials for vtex in the config file from vtex
vtex set_vendor <vendor> Set the vendor name in the manifest file
 ``` 

An improvement was made in the storage of the credentials. A success file is now generated where the credentials are stored. to view the contents of this file you can run the following line in `console ~ / .config / configstore / exito.json` 

 ``` bash
credentials Manage your credentials for aws
credentials get Gets the current credentials used in aws
credentials clear Clear the current credentials used in aws
credentials set <username> <pwd> Sets the current credentials for aws
 ``` 

### v2.0.11 2019-03-18

#Fixed

* The bug is solved when cloning projects with the success command clone from windows.

### v2.0.11 2019-03-8

## Changed

* Removed `" PollForSourceChanges ":" false ",` from the template created for cloudFormation, this line created the instances of CodePipeline without the option to listen to CodeCommit changes

### v2.0.10 2019-02-13

#Added

* Creation of the `success generate` command to create the templates for aws cloud formation with the command ` success generate templte [repository name] ` and the creation of the basic configuration of the projects with the command ` success generate config` 

### v2.0.3, v2.0.4, v2.0.5 2019-02-13

#Added

* Update of the commands used to perform the `publish` of the components in vtex, to perform ` link` . the commands for the continuous integration process in Vtex were optimized

### v2.0.2 2019-01-25

#Added

* Creation of the command `success init` for downloading source codes hosted on github

### v2.0.1 2019-01-25

#Added

* Creation of the command `success create workspace` for the creation of the configuration of the development workspace

### v1.1.0 2019-01-14

#Added

* Integration of logic to perform the process of continuous integration of all projects to Vtex.

Added the command: `Continuous integration` 

This command is responsible for performing the following processes

1. Create a new workspace `dev` and modify the workspace to productive with the command ` vtex workspace production true` 
2. Cloning of the aws repositories with the indicated prefix
3. Publication of the components one by one in order of importance
4. Promote the workspace to production, this command removes the `dev` workspace and passes the changes to the workspace master

It must be taken into account in all the components when they are published:

* The version of the component must be greater than the current one, otherwise vtex will not take the changes made to the component, to validate the current version of a published component we can use `vtex deps list` which lists the published dependencies.

