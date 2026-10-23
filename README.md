# Redux Core & React-Redux Integration

Dự án thực hành Redux Core và React-Redux bằng cách tự implement, không sử dụng thư viện `redux` hoặc `react-redux` từ npm.

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
- `src/libs/react-redux.js`: Tự implement Provider, useStore, useSelector và useDispatch.
- `src/store/`: Khởi tạo store và định nghĩa reducer.
- `src/pages/`: Các trang danh sách, thêm và sửa task.
- `src/components/`: Các component tái sử dụng.
- `db.json`: Dữ liệu mẫu cho JSON Server.
- `vite.config.js`: Cấu hình Vite, alias và đường dẫn deploy.

## 4. Cài đặt và chạy dự án

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

## 5. Deploy lên GitHub Pages bằng gh-pages

### Bước 1: Cài gh-pages

```bash
npm install --save-dev gh-pages
```

### Bước 2: Cấu hình Vite

Trong `vite.config.js`, thêm `base` phù hợp với tên repository:

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

### Bước 3: Cấu hình scripts

Trong `package.json`, thêm hai script `predeploy` và `deploy`:

```json
{
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "predeploy": "npm run build",
        "deploy": "gh-pages -d dist",
        "lint": "eslint .",
        "preview": "vite preview",
        "mock-api": "json-server db.json"
    }
}
```

Chỉ cập nhật phần `scripts` trong file hiện có, không thay thế các dependencies khác.

- `predeploy`: tự chạy build trước khi deploy.
- `deploy`: đưa nội dung thư mục `dist` lên nhánh `gh-pages`.

### Bước 4: Deploy

Sau khi hoàn thành code, chạy:

```bash
npm run deploy
```

Lệnh này tự build ứng dụng rồi deploy lên GitHub Pages.

### Bước 5: Cấu hình GitHub Pages

1. Mở repository trên GitHub.
2. Chọn **Settings → Pages**.
3. Tại **Build and deployment**, chọn **Deploy from a branch**.
4. Chọn branch `gh-pages`, thư mục `/(root)`.
5. Nhấn **Save**.

Nếu trước đó đã dùng GitHub Actions để deploy, hãy chuyển sang một phương thức deploy duy nhất để tránh cấu hình xung đột.

### Bước 6: Truy cập website

Website:

https://hungomega.github.io/f8-zoom-day40/

Trang demo Redux Core:

https://hungomega.github.io/f8-zoom-day40/redux.html

Nếu vừa deploy xong mà chưa thấy thay đổi, hãy đợi GitHub Pages cập nhật rồi nhấn `Ctrl + F5`.

## 6. Lưu ý khi deploy

- Các file trong `public/` được Vite sao chép vào thư mục `dist/` khi build.
- Đường dẫn đến tài nguyên cần tương thích với `base` đã cấu hình.
- Với liên kết tới `redux.html`, có thể sử dụng `import.meta.env.BASE_URL + "redux.html"` trong React.
- GitHub Pages chỉ host frontend tĩnh. API `http://localhost:3000/tasks` chỉ hoạt động trên máy đang chạy JSON Server; muốn CRUD hoạt động công khai, cần deploy API lên máy chủ riêng và cập nhật URL API.
- Không cần đưa `node_modules/` hoặc thư mục `dist/` vào Git repository nguồn.

## 7. Mục tiêu học tập

- Hiểu cơ chế hoạt động của Redux Store.
- Hiểu cách `dispatch`, reducer và `subscribe` phối hợp.
- Tự xây dựng Context Provider và các custom hooks tương tự React-Redux.
- Hiểu cách đồng bộ state với API CRUD.
- Thực hành build và deploy ứng dụng React bằng Vite và GitHub Pages.
