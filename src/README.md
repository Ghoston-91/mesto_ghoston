# Проект: Место

* [Ссылка на проект](https://ghoston-91.github.io/mesto_ghoston/index.html)

### :small_blue_diamond: Обзор

* Одностраничный сайт с обзором фотографий и профиля
* Здесь задействована грид-сетка
* Внедрена форма с полями ввода и кнопками
* Реализовано добавление новых фото через кнопку "+"
* Можно ставить лайки на карточках + есть счетчик лайков
* Картинки открываются в новой модалке

### :small_red_triangle_down: Внедрен JS

* Можно открыть попап через кнопку редактирования
* Подтягиваются данные из профиля - в поле ввода
* При внесени данных в поле ввода - данных изменяются через кнопку "Сохранить"
* Есть валидация форм
* Рефакторинг кода (перенос кода из Index.js в классы Card и formValidator для оптимизации и разгрузки памяти)
* Новые классы для последующего создания экземпляров форм и модалок
* Работа с WebPack

### :arrow_down_small: Работа с сервером
* Карточки подтягиваются из сервера
* Все данные (карточки, профиль, аватарка) можно сохранять на сервер

**В планах** 

* Оптимизация кода с помощью TypeScript