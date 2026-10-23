# Redux Core & React-Redux Integration

Dự án thực hành tự implement Redux Core và React-Redux, kết hợp ứng dụng Task Management bằng React, Vite và JSON Server.

## 1. Công nghệ sử dụng

- React 19
- Vite
- JavaScript (JSX)
- React Router
- SCSS Modules
- JSON Server
- Redux Core và React-Redux tự implement
- GitHub Pages và `gh-pages`

## 2. Chức năng chính

### Bài 1: Redux Core

Tự xây dựng `createStore()` với các phương thức:

- `getState()`: Lấy state hiện tại.
- `dispatch(action)`: Gửi action để cập nhật state thông qua reducer.
- `subscribe(listener)`: Đăng ký listener và trả về hàm `unsubscribe`.

Demo counter được xây dựng bằng JavaScript thuần trong `public/redux.html`, không phụ thuộc vào React.

Các chức năng: Increase, Decrease, Reset và Remove Listener.

### Bài 2: Task Management

Xây dựng ứng dụng quản lý công việc với Redux và React-Redux tự implement.

- Hiển thị danh sách task.
- Thêm task mới.
- Chỉnh sửa task.
- Xóa task có xác nhận.
- Validate dữ liệu đầu vào.
- Hiển thị trạng thái loading và lỗi API.
- Quản lý state tập trung bằng Redux Store.
- Sử dụng JSON Server làm API giả lập.

## 3. Cấu trúc thư mục

```text
f8-zoom-day40/
├── public/
│   ├── redux.js
│   ├── redux.html
│   └── favicon.svg
├── src/
│   ├── libs/
│   │   ├── redux.js
│   │   └── react-redux.js
│   ├── store/
│   │   ├── index.js
│   │   └── reducers/
│   │       └── taskReducer.js
│   ├── pages/
│   │   ├── TaskList/
│   │   ├── NewTask/
│   │   └── EditTask/
│   ├── components/
│   │   ├── TaskItem/
│   │   └── TaskForm/
│   ├── App.jsx
│   └── main.jsx
├── db.json
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

### Vai trò các thành phần

- `public/redux.js`: Redux Core thuần JavaScript.
- `public/redux.html`: Trang demo Redux Core độc lập.
- `src/libs/redux.js`: Bản Redux Core dùng trong React.
- `src/libs/react-redux.js`: Tự implement `ReduxProvider`, `useStore`, `useSelector` và `useDispatch`.
- `src/store/`: Khởi tạo store và định nghĩa reducer.
- `src/pages/`: Các trang danh sách, thêm và sửa task.
- `src/components/`: Các component tái sử dụng.
- `src/App.jsx`: Khai báo các route của ứng dụng.
- `src/main.jsx`: Điểm khởi chạy React, cấu hình Router và cung cấp Redux Store.
- `db.json`: Dữ liệu mẫu cho JSON Server.
- `vite.config.js`: Cấu hình Vite, alias và đường dẫn deploy.

## 4. Giải thích file `src/main.jsx`

Đây là file khởi chạy ứng dụng React. Nội dung chính:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ReduxProvider } from "@/libs/react-redux";
import store from "@/store";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter basename="/f8-zoom-day40">
            <ReduxProvider store={store}>
                <App />
            </ReduxProvider>
        </BrowserRouter>
    </StrictMode>,
);
```

### Ý nghĩa từng thành phần

**`createRoot(document.getElementById("root"))`**

Tìm phần tử có `id="root"` trong `index.html` để React render giao diện vào đó.

**`StrictMode`**

Hỗ trợ phát hiện một số vấn đề tiềm ẩn trong quá trình phát triển. Trong môi trường development, một số hàm hoặc effect có thể được chạy thêm lần để kiểm tra tính an toàn.

**`BrowserRouter basename="/f8-zoom-day40"`**

Cấu hình đường dẫn cơ sở cho React Router khi triển khai trên GitHub Pages.

Website được đặt tại:

```text
https://hungomega.github.io/f8-zoom-day40/
```

Vì vậy, `basename` cần khớp với tên repository. Các route trong `App.jsx` vẫn khai báo bình thường:

```jsx
<Routes>
    <Route path="/" element={<TaskList />} />
    <Route path="/new-task" element={<NewTask />} />
    <Route path="/:id/edit" element={<EditTask />} />
</Routes>
```

Không cần thêm `/f8-zoom-day40` vào từng route.

**`ReduxProvider store={store}`**

Truyền Redux Store xuống các component con thông qua React Context. Nhờ vậy, các component có thể sử dụng `useSelector()` để đọc state và `useDispatch()` để gửi action mà không phải truyền store qua nhiều cấp props.

**`App`**

Là component chính chứa cấu hình route và các trang của ứng dụng.

## 5. Cài đặt và chạy dự án

### Bước 1: Clone repository

```bash
git clone https://github.com/hungomega/f8-zoom-day40.git
cd f8-zoom-day40
```

### Bước 2: Cài dependencies

```bash
npm install
```

### Bước 3: Chạy JSON Server

Mở terminal thứ nhất:

```bash
npm run mock-api
```

API mặc định:

```text
http://localhost:3000/tasks
```

### Bước 4: Chạy ứng dụng React

Mở terminal thứ hai:

```bash
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal, thường là `http://localhost:5173`.

## 6. Deploy lên GitHub Pages bằng gh-pages

### Bước 1: Cài gh-pages

```bash
npm install --save-dev gh-pages
```

### Bước 2: Cấu hình Vite

Trong `vite.config.js`, cấu hình `base` theo tên repository:

```js
export default defineConfig({
    plugins: [react()],
    base: "/f8-zoom-day40/",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
```

Giữ nguyên các cấu hình khác đang có trong dự án.

### Bước 3: Cấu hình React Router

Trong `src/main.jsx`, đặt `basename` cho `BrowserRouter`:

```jsx
<BrowserRouter basename="/f8-zoom-day40">
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>
</BrowserRouter>
```

Hai cấu hình có vai trò khác nhau:

- `base` trong `vite.config.js`: xử lý đường dẫn tài nguyên khi build.
- `basename` trong `BrowserRouter`: xử lý đường dẫn điều hướng của React Router.

Cần cấu hình cả hai để ứng dụng hoạt động đúng tại đường dẫn repository trên GitHub Pages.

### Bước 4: Thêm scripts trong package.json

Bổ sung hai script sau vào mục `scripts`:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Ví dụ phần `scripts` đầy đủ:

```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
    "lint": "eslint .",
    "preview": "vite preview",
    "mock-api": "json-server db.json"
}
```

Chỉ cập nhật phần `scripts` trong file hiện có, không thay thế các dependencies khác.

- `predeploy`: tự chạy build trước khi deploy.
- `deploy`: đưa nội dung thư mục `dist` lên nhánh `gh-pages`.

### Bước 5: Deploy

Sau khi hoàn thành code, chạy:

```bash
npm run deploy
```

Lệnh này tự build ứng dụng rồi deploy lên GitHub Pages.

### Bước 6: Cấu hình GitHub Pages

1. Mở repository trên GitHub.
2. Chọn **Settings → Pages**.
3. Tại **Build and deployment**, chọn **Deploy from a branch**.
4. Chọn branch `gh-pages`, thư mục `/(root)`.
5. Nhấn **Save**.

Nếu trước đó đã dùng GitHub Actions để deploy, hãy chuyển sang một phương thức deploy duy nhất để tránh hai cách deploy xung đột nhau.

### Bước 7: Truy cập website

**Website chính:**

https://hungomega.github.io/f8-zoom-day40/

**Trang demo Redux Core:**

https://hungomega.github.io/f8-zoom-day40/redux.html

Nếu vừa deploy xong mà chưa thấy thay đổi, hãy đợi GitHub Pages cập nhật rồi nhấn `Ctrl + F5`.

## 7. Lưu ý khi deploy

- Các file trong `public/` được Vite sao chép vào thư mục `dist/` khi build.
- Đường dẫn đến tài nguyên cần tương thích với `base` đã cấu hình.
- Với liên kết tới `redux.html`, có thể sử dụng `import.meta.env.BASE_URL + "redux.html"` trong React.
- GitHub Pages chỉ host frontend. API `http://localhost:3000/tasks` chỉ hoạt động trên máy đang chạy JSON Server; muốn CRUD hoạt động công khai, cần deploy API lên máy chủ riêng và cập nhật URL API.
- Không cần đưa `node_modules/` hoặc thư mục `dist/` vào Git repository nguồn.

## 8. Mục tiêu học tập

- Hiểu cơ chế hoạt động của Redux Store.
- Hiểu cách `dispatch`, reducer và `subscribe` phối hợp.
- Tự xây dựng Context Provider và các custom hooks tương tự React-Redux.
- Hiểu cách đồng bộ state với API CRUD.
- Hiểu vai trò của `BrowserRouter basename` khi triển khai ứng dụng ở subpath.
- Thực hành build và deploy ứng dụng React bằng Vite và GitHub Pages.
