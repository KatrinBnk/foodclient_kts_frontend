# [FoodClient](https://katrinbnk.github.io/foodclient_kts_frontend/)

Проект, выполняемый в рамках курса ["Начинающий React разработчик"](https://metaclass.kts.studio/).
Тема курсового проекта: Food Strapi.

Ознакомиться с [презентацией](https://www.figma.com/deck/mRlwx9UAAfBsapx7D2z6JJ/Research-Readout?node-id=1-354&t=y16G3YPoxTx2Y1HH-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1). В презентации подробно продемонстрирован проект, далее будет приведено краткое описание реализованных функций. 

## Основные реализованные возможности

### 1. Расширенная фильтрация рецептов
- Поиск по названию блюда
- Фильтрация по калорийности:
  - Низкокалорийные блюда
  - Калорийные блюда
- Фильтрация по времени приготовления:
  - Быстрые рецепты
  - Долгие рецепты
- Специальный тег для вегетарианских блюд

### 2. Перерасчет ингридиентов для блюда на другое количество порций

### 3. Оптимизированный интерфейс для телефонов, планшетов и пк

### 4. Авторизация 
- Авторизация через Google
- Хранение данных пользователя в Firebase
- Личный профиль пользователя

### 5. Сохренение рецептов в избранное (для авторизированных пользователей)
- Избранные рецепты храним в Firebase

### 6. Страница со списокм категорий 

### 7. Возможность получение случайного рецепта (учитывая выбранные фильтры)

### 8. Возможность получение рецепта дня

``` ts
const today = new Date();
const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
const response = await getRecipes({ pageSize: 100 });
const recipes = response.data;
    
if (recipes.length === 0) {
  return null;
}

const index = seed % recipes.length;
return recipes[index].documentId;
```

## Технологии
- React
- TypeScript
- SCSS
- MobX для управления состоянием
- Firebase для хранения данных

# Контакты:
- телеграм: https://t.me/Katrin_Bnk
- почта:  yekaterina@bankoev.ru
