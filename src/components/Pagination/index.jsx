import React, { useState } from "react";

const Pagination = () => {
    const totalPages = 10; // Umumiy sahifalar soni
    const maxVisiblePages = 5; // Bir vaqtning o'zida ko'rinadigan sahifalar
    const [currentPage, setCurrentPage] = useState(1);

    // Faol sahifalar ro'yxatini hisoblash
    const startPage = Math.max(
        currentPage - Math.floor(maxVisiblePages / 2),
        1
    );
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    const visiblePages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="btn-group flex gap-1">
                {/* Oldingi tugma */}
                <button
                    className="btn btn-outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    «
                </button>
                {/* Ko'rinadigan sahifalar */}
                {visiblePages.map((page) => (
                    <button
                        key={page}
                        className={`btn btn-outline ${
                            currentPage === page ? "btn-active" : ""
                        }`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}
                {/* Keyingi tugma */}
                <button
                    className="btn btn-outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    »
                </button>
            </div>
        </div>
    );
};

export default Pagination;
