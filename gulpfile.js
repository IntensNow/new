 "use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const pug = require("gulp-pug");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");

//cоздаем переменную с масивом всех плагинов Postccss который мы будем использовать, пока один autoprefixer будет 
 	let postplugins = [autoprefixer];
 	gulp.task("sass", function() {

 		return gulp.src("./source/sass/main.scss") // говорим какой файл взять
 			.pipe(sass())
 			.pipe(postcss(postplugins))  // передаем переменную postplugins 
 			.pipe(gulp.dest("./public/css/")); //задаем папку куда вставлять 

 	});
//пишем таск для работы со страницами
 	gulp.task("pages", function() {
 		return gulp.src("./source/pages/*.pug")
 			.pipe(pug({pretty: true}))  //с переносом pretty: true
 			.pipe(gulp.dest("./public"));

 	});

 	gulp.task("watch", function() {   //определим ватчер и слежение за всем изминениями , и делаем слежку за всеми файлами во всех каталог и подкаталогах

		gulp.watch(["./source/sass/main.scss", "./source/**/*.scss"], ["sass"]); // указываем какие Taski должны выполняться при изминении в этих файлах (в данном случае это "sass")
 		gulp.watch("./source/**/*.pug", ["pages"]);
 	});

 	gulp.task("default", ["pages","sass", "watch"]); //определаем дефолтный таск и  укажем масив. То есть при определении таска, вторым аругментов может быть не только callback который выполняет все задачи, но и масивы с названиями тасков - styles and watch. При запуске gulp выполнит команду(таск) default, который выполнит styles  and watch

