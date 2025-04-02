import React from "react";

const Pagination = ({ currentPage = 1, totalPages, onPageChange }) => {
    const maxVisiblePages = 5; // Bir vaqtning o'zida ko'rinadigan sahifalar

    // Faol sahifalar ro'yxatini hisoblash
    const halfVisible = Math.floor(maxVisiblePages / 2);
    const startPage = Math.max(
        Math.min(currentPage - halfVisible, totalPages - maxVisiblePages + 1),
        1
    );
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    // Sahifalarni to'g'ri tartibda chiqarish
    const visiblePages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i // Bu yerdagi `startPage + i` orqali sahifalar to'g'ri tartibda bo'ladi
    );

    return (
        <div className="flex justify-center items-center">
            <div className="btn-group flex gap-1">
                {/* Oldingi tugma */}
                <button
                    className="btn btn-sm btn-outline"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    «
                </button>
                {/* Ko'rinadigan sahifalar */}
                {visiblePages.map((page) => (
                    <button
                        key={page}
                        className={`btn btn-sm btn-outline ${
                            currentPage === page ? "btn-active" : ""
                        }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
                {/* Keyingi tugma */}
                <button
                    className="btn btn-sm btn-outline"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || !totalPages}
                >
                    »
                </button>
            </div>
        </div>
    );
};

export default Pagination;
