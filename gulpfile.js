const gulp = require("gulp");
const sass = require("gulp-sass");
const pug = require("gulp-pug");

 	gulp.task("sass", function() {

 		return gulp.src("./source/sass/main.scss")
 			.pipe(sass())
 			.pipe(gulp.dest("./public/css/"));

 	});
//пишем таск для работы со страницами
 	gulp.task("pages", function() {
 		return gulp.src("./source/pages/*.pug")
 			.pipe(pug({pretty: true}))  //с переносом pretty: true
 			.pipe(gulp.dest("./public"));

 	});
//определим ватчер и слежение за всем изминениями , и делаем слежку за всеми файлами во всех каталог и подкаталогах
 	gulp.task("watch", function() {   
// указываем какие Taski должны выполняться при изминении в этих файлах (в данном случае это "sass")
		gulp.watch(["./source/sass/main.scss", "./source/**/*.scss"], ["sass"]);
 		gulp.watch("./source/**/*.pug", ["pages"]);
 	});
//определаем дефолтный таск и  укажем масив. То есть при определении таска, второим аругментов может быть не только callback который выполняет все задачи, но и масивы с названиями тасков - styles and watch. При запуске gulp выполнит команду(таск) default, который выполнит styles  and watch
 	gulp.task("default", ["pages","sass", "watch"]);


// const gulp = require("gulp");
// const sass = require("gulp-sass");
// const pug = require("gulp-pug");

// 	gulp.task("styles", function() {

// 		return gulp.src("./source/sass/main.scss")
// 			.pipe(sass())
// 			.pipe(gulp.dest("./public/css/"));

// 	});
