# FoodClient

Проект, выполняемый в рамках курса ["Начинающий React разработчик"](https://metaclass.kts.studio/).
Тема курсового проекта: Food Strapi. [Презентация](https://www.figma.com/slides/mRlwx9UAAfBsapx7D2z6JJ/Research-Readout?node-id=1-590&t=rkYq5nNpxcu3u4es-1)

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

### 5. Система избранных рецептов (для авторизированных пользователей)
- Избранные рецепты храним в Firebase

### 6. Возможность получение случайного рецепта (учитывая выбранные фильтры)

### 7. Возможность получение рецепта дня

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
