import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-200">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Chào mừng bạn quay trở lại
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Nhập email của bạn"
              className="mt-2 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              placeholder="Nhập   mật khẩu của bạn"
              className="mt-2 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Đăng nhập
          </button>
        </form>

        <Link href="/" className="text-center mx-auto mt-4 font-sm block">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
