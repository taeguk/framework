#pragma once
#include <samchon/API.hpp>

#include <vector>

namespace samchon
{
	namespace library
	{
		/**
		 * @brief Case generator
		 *
		 * <h3>Example source</h3>
		 * <p> Packer - Find the best packaging solution </p>
		 * 
		 * \par examples/packer/Packer.hpp
		 *		@includelineno examples/packer/Packer.hpp
		 * \par examples/packer/WrapperArray.hpp
		 *		@includelineno examples/packer/WrapperArray.hpp
		 * \par examples/packer/Wrapper.hpp
		 *		@includelineno examples/packer/Wrapper.hpp
		 * \par examples/packer/Product.hpp
		 *		@includelineno examples/packer/Product.hpp
		 * \par examples/packer/Instance.hpp
		 *		@includelineno examples/packer/Instance.hpp
		 *
		 * \par examples/packer/main.cpp
		 *		@includelineno examples/packer/main.cpp
		 * \par examples/packer/Packer.cpp
		 *		@includelineno examples/packer/Packer.cpp
		 * \par examples/packer/WrapperArray.cpp
		 *		@includelineno examples/packer/WrapperArray.cpp
		 * \par examples/packer/Wrapper.cpp
		 *		@includelineno examples/packer/Wrapper.cpp
		 * \par examples/packer/Product.cpp
		 *		@includelineno examples/packer/Product.cpp
		 * \par examples/packer/Instance.cpp
		 *		@includelineno examples/packer/Instance.cpp
		 *
		 * @author Jeongho Nam
		 */
		class SAMCHON_FRAMEWORK_API CaseGenerator
		{
		protected:
			/**
			 * @brief N, size of the candidates
			 */
			size_t n_;

			/**
			 * @brief R, size of elements of each case
			 */
			size_t r_;

			/**
			 * @brief Size, the number of all cases
			 */
			size_t size_;

			std::vector<size_t> dividerArray;

		public:
			/* ----------------------------------------------------
				CONSTRUCTORS
			---------------------------------------------------- */
			/**
			 * @brief Construct from size of N and R
			 *
			 * @param n Size of candidates
			 * @param r Size of elements of each case
			 */
			CaseGenerator(size_t n, size_t r);
			virtual ~CaseGenerator() = default;

			/* ----------------------------------------------------
				ELEMENT ACCESSORS
			---------------------------------------------------- */
			/**
			 * @brief Get size of all cases
			 *
			 * @return The size of all cases
			 */
			auto size() const -> size_t;

			/**
			 * @brief Get x'th row
			 *
			 * @return The row of the x'th in combined permuation case
			 */
			virtual auto operator[](size_t) const -> std::vector<size_t> = 0;

			/**
			 * @copy CaseGenerator::operator[]()
			 */
			auto at(size_t) const -> std::vector<size_t>;

			/** 
			 * @brief Get size of the N
			 */
			auto n() const -> size_t;

			/**
			 * @brief Get size of the R
			 */
			auto r() const -> size_t;

		public:
			/* ----------------------------------------------------
				TO_MATRIX
			---------------------------------------------------- */
			/**
			 * @return A matrix containing all cases
			 */
			auto toMatrix() const -> std::vector<std::vector<size_t>>;
		};
	};
};