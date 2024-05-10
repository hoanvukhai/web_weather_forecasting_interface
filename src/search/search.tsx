import { Fragment, useState, useRef, useEffect, ChangeEvent } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
interface SearchProps {
  onCitySelect: (city: any) => void; // Assuming 'city' is the type of data you're passing
  setWeatherData: (data: any) => void; // Assuming 'data' is the type of weather data you're passing
  setForecastData: (data: any) => void; // Thêm trạng thái cho dự báo thời tiết
}

const Search = ({ onCitySelect, setWeatherData, setForecastData}:SearchProps) => {
  const [options, setOptions] = useState<any[]>([]);
  const [term, setTerm] = useState<string>('');
  const [city, setCity] = useState<any>(null); // Thêm trạng thái cho thành phố được chọn
  const [isOpen, setIsOpen] = useState(false);
  const [clickedInside, setClickedInside] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  

  const getSearchOptions = (value: string) => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=8a7c5f0be154320f7be5cdd94e638411`)
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((error) => console.error('Lỗi khi lấy dữ liệu tìm kiếm:', error));
  };

  const getWeatherAndForecast = (cityName: string) => {
    if (!cityName) return;

    Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8a7c5f0be154320f7be5cdd94e638411`).then(res => res.json()),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=8a7c5f0be154320f7be5cdd94e638411`).then(res => res.json())
    ])
    .then(([currentWeatherData, forecastData]) => {
      setWeatherData(currentWeatherData);
      setForecastData(forecastData);
    })
    .catch((error) => console.error('Lỗi khi lấy dữ liệu thời tiết:', error));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    if (value === '') return;
    getSearchOptions(value);
  };

  const onOptionSelect = (option: any) => { // Sửa thành `any` để chấp nhận bất kỳ loại dữ liệu nào
    setCity(option); // Đặt thành phố đã chọn
    setTerm(`${option.name}, ${option.country}`); // Cập nhật giá trị trong thanh tìm kiếm
    onCitySelect(option); // Gọi hàm callback để truyền dữ liệu thành phố đã chọn ra ngoài
    setIsOpen(false); // Đóng dropdown khi chọn tùy chọn
    getWeatherAndForecast(option.name);
  };

  const handleInputClick = () => {
    if (!isOpen) {
      setClickedInside(true); // Đánh dấu rằng đã click vào bên trong input
    }
    setIsOpen(!isOpen); // Đảo ngược trạng thái của dropdown khi click vào input
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!clickedInside && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      setClickedInside(false); // Reset trạng thái clickedInside sau mỗi lần click ra ngoài
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickedInside]);

  useEffect(() => {
    if (term) {
      setIsOpen(true); // Mở dropdown khi có giá trị trong input
    }
  }, [term]);


  useEffect(() => {
    if (city) {
      setTerm(`${city.name}, ${city.country}`);
      setOptions([]);
    }
  }, [city]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt (ví dụ: scroll down)
      setTerm(term + ' '); // Cập nhật term với khoảng trắng mới nếu người dùng nhấn Spacebar
      return;
    }
  };

  return (
    <Menu as="div" onClick={handleInputClick} className="relative inline-block text-left w-full my-1">
      <div className="flex mt-2 rounded-md shadow-sm bg-white">
        <input
          ref={inputRef}
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search for cities"
          value={term}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
        />

      </div>

      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          ref={dropdownRef}
          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            {options.map((option: any, index: number) => (
              <Menu.Item key={option.name + '-' + index}>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <button
                      className="w-full text-left text-sm py-2 px-4 rounded-md  focus:outline-none"
                      onClick={() => onOptionSelect(option)} // Thay đổi thành gọi hàm `onOptionSelect` với tham số là `option`
                      aria-label={`Chọn ${option.name}`}
                    >
                      {option.name}, {option.country}
                    </button>
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>

    </Menu>
  );
};

export default Search;
